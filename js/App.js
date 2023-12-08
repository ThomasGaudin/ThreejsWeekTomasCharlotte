import * as THREE from "three";
import Shape from "./Shape.js";
import Light from "./Light.js";
import Camera from "./Camera.js";
import * as dat from "dat.gui";
import Text from "./Text.js";
import Chat from "./Chat.js";
import AudioDetector from "./AudioDetector.js";
import { repartitionSpherique } from "./repartitionSpherique.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";

export default class App {
  constructor() {
    this.frameCounter = 0;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.counter = 0;
    this.changingLineCounter = 0;
    this.limiteDisscution = 2;
    this.allMots = [];
    this.currentWord = [];
    this.motCounter = [];
    this.wordLineCounter = [];
    this.lineCounter = 0;
    this.charString = null;
    this.retourLigne = 0;
    this.distanceFromCenter = 11;
    this.endTransition = false;
    this.targetDistance = 11;
    this.transitionDuration = 5000;
    this.transitionStartTime = null;
    this.endRotation = false;
    this.sphereGroup = new THREE.Group();
    this.currentSentenceGroupArray = [];
    this.lastSentenceIsLooking = true;

    this.nombreLettres = 0;
    this.paragrapheX = 0;
    this.paragrapheY = 0;

    this.gui = new dat.GUI();

    this.chat = new Chat();

    this.chat.addEventListener("word", this.addWord.bind(this));
    this.chat.addEventListener("speechEnd", this.speechEnd.bind(this));
    this.chat.addEventListener("gpt_response", this.onResponse.bind(this));
    this.button = document.getElementById("mybutton");
    this.bgDiv = document.getElementById("bg");

    this.canSpeak = true;

    //Audio detector
    this.audioDetector = new AudioDetector();
    this.audioDetector.addEventListener(
      "transcriptReady",
      this.onTextReceived.bind(this)
    );

    //Stop micro avec barre espace
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.audioDetector.stopRecording();
        this.allMots = [];
        this.canSpeak = false;
      }
    });

    this.initTHREE();
  }

  stateManager(type) {
    if (type == "speech_end") {
      setTimeout(() => {
        this.targetDistance = 40;
        this.transitionStartTime = Date.now();
        // setTimeout(() => {
        this.lastSentenceIsLooking = false;
        // console.log(this.currentWord.length);

        const repartion = repartitionSpherique(this.currentWord.length, 30);
        // console.log(repartion);

        for (let index = 0; index < this.currentWord.length; index++) {
          this.currentWord[index].targetPosition = repartion[index];
        }
        // }, 1000);
      }, 4000);
    }

    if (type == "speech_end_user") {
      this.targetDistance = 40;
      this.transitionStartTime = Date.now();
      // setTimeout(() => {
      this.lastSentenceIsLooking = false;
      // console.log(this.currentWord.length);

      const repartion = repartitionSpherique(this.currentWord.length, 30);
      // console.log(repartion);

      for (let index = 0; index < this.currentWord.length; index++) {
        this.currentWord[index].targetPosition = repartion[index];
      }
      // }, 1000);
    }

    this.counter = this.counter + 1;
    this.camera.updateState(this.counter);
  }

  onResponse(response) {
    this.nbrMot = response.split(" ");
    this.newLookingTextHandler();

    this.myInterval = setInterval(() => {
      if (this.canSpeak) {
        this.chat.launchSpeech(response);
        clearInterval(this.myInterval);
      }
    }, 500);
  }

  newLookingTextHandler() {
    this.lastSentenceIsLooking = true;

    this.group = new THREE.Group();
    this.sphereGroup.add(this.group);
    this.currentSentenceGroupArray.push(this.group);
  }

  async initTHREE() {
    console.log(this.chat.speech.synthesisVoice);
    // Create a scene
    this.scene = new THREE.Scene();
    this.scene.add(this.sphereGroup);

    //CAMERA CLASS
    this.camera = new Camera(this.scene);
    this.camera.createCamera();

    this.camera.gui(this.gui);

    // Create a renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Set shadow
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    document.body.appendChild(this.renderer.domElement);

    const renderScene = new RenderPass(this.scene, this.camera);
    const composer = new EffectComposer(this.renderer);
    composer.addPass(renderScene);

    // Create a light
    this.light = new Light(this.scene);
    this.light.createLight();
    this.light.gui(this.gui);
    this.light.createHdr();
    // this.light.createBloom();

    this.light2 = new Light(this.scene);
    this.light2.createUpdateLight();

    // Create a text
    this.text = new Text(this.scene);
    this.font = await this.text.loadFont();
    this.font2 = await this.text.loadFont2();

    this.button.addEventListener("click", () => {
      this.button.remove();
      this.bgDiv.remove();
      this.chat.call(this.chat.context);
    });
    console.log("start");
    this.draw();
  }

  calcSizeBox(obj) {
    const boundingBox = new THREE.Box3().setFromObject(obj);
    const sizeX =
      obj.geometry.boundingBox.max.x - obj.geometry.boundingBox.min.x;
    return sizeX;
  }

  addWord(mot) {
    if (this.userContinueToSpeak) {
      this.stateManager("speech_end_user");
      this.userContinueToSpeak = false;
    }
    this.CharCounter();
    this.motCounter.push(mot);
    const text = this.text.createText(mot, this.font);
    const sizeX = this.calcSizeBox(text.text);

    const target = new THREE.Vector3(0, 0, -10);
    target.applyMatrix4(this.camera.camera.matrixWorld);
    const distance = text.text.position.distanceTo(target);
    let amount = 0.01;

    this.allMots.push(text);

    this.currentWord.push(text);
    this.group.add(text.text);

    // this.group.position.y = this.changingLineCounter * 1.2;

    let targetY = target.y;
    targetY += (this.nbrMot.length / 2 - this.allMots.length) * 1.2;
    text.targetPosition.x = this.paragrapheX;
    text.targetPosition.y = this.paragrapheY;
    text.targetPosition.z = 0;
    text.amount = amount;

    this.wordLineCounter.push(text);

    this.paragrapheX = this.paragrapheX + sizeX + 1;
    this.paragrapheX -= sizeX / 2;

    for (let i = 0; i < this.wordLineCounter.length; i++) {
      this.wordLineCounter[i].targetPosition.x -= sizeX / 2;
    }
  }

  speechEnd(data) {
    this.paragrapheX = 0;
    this.paragrapheY = 0;
    this.chat.messages.push({
      role: "assistant",
      content: data.choices[0].message.content,
    });
    setTimeout(() => {
      this.audioDetector.startRecording();
      this.userContinueToSpeak = true;
    }, 4000);

    this.stateManager("speech_end");

    this.changingLineCounter = 0;

    this.lineCounter++;
    console.log("je t'écoute");
  }

  lancerLesMotsAvecInterval() {
    if (this.myWords.length > 0) {
      const mot = this.myWords.shift();
      setTimeout(() => {
        const text = this.text.createText(mot, this.font2, "user");
        const target = new THREE.Vector3(0, 0, -10);
        target.applyMatrix4(this.camera.camera.matrixWorld);
        const distance = text.text.position.distanceTo(target);
        let amount = 1;
        if (distance > 0) {
          amount = Math.min(0.01, distance);
        }
        this.allMots.push(text);
        this.currentWord.push(text);
        this.sphereGroup.add(text.text);

        let targetY = target.y;
        targetY += (this.nbrMot.length / 2 - this.allMots.length) * 1.2;
        text.targetPosition.x = this.paragrapheX;
        text.targetPosition.y = 6 + this.myWords.length * 1.2;
        text.targetPosition.z = 0;
        text.amount = amount;
        this.lancerLesMotsAvecInterval();
      }, 100);
    } else {
      this.allMots = [];
      this.canSpeak = true;
      this.counter++;
      if (this.userContinueToSpeak) {
        this.stateManager("speech_end_user");
        this.userContinueToSpeak = false;
      }
    }
  }

  onTextReceived(transcript) {
    this.chat.call(transcript.text);
    this.myWords = transcript.text.split(" ");

    console.log("USER TEXT ", transcript.text);
    this.newLookingTextHandler();

    this.lancerLesMotsAvecInterval();
  }

  CharCounter() {
    this.charString = this.motCounter.toString();

    if (this.charString.length > 20) {
      this.motCounter = [];
      this.wordLineCounter = [];
      this.changingLineCounter++;
      this.paragrapheY = this.paragrapheY - 2;
      // this.paragrapheY = this.lerp(this.paragrapheY, this.paragrapheY + 2, 0.1);

      this.paragrapheX = 0;
    }
  }

  draw() {
    this.CheckAnimation();
    // console.log(this.lineCounter);

    this.currentWord.forEach((mot) => {
      mot.update();
    });

    this.currentWord.forEach((mot) => {
      mot.text.lookAt(this.camera.camera.position);
    });
    this.light.update();
    this.renderer.render(this.scene, this.camera.camera);
    requestAnimationFrame(this.draw.bind(this));

    this.light2.updatingLight(
      this.camera.camera.position.x,
      10,
      this.camera.camera.position.z
    );
  }

  CheckAnimation() {
    if (this.transitionStartTime !== null && this.endRotation == true) {
      const currentTime = Date.now();
      const elapsed = currentTime - this.transitionStartTime;
      const progress = Math.min(elapsed / this.transitionDuration, 1);

      this.distanceFromCenter = this.lerp(
        this.distanceFromCenter,
        this.targetDistance,
        progress
      );
      console.log(progress);

      if (progress === 1) {
        this.transitionStartTime = null;
        this.distanceFromCenter = this.targetDistance;
      }
    }

    this.camera.camera.lookAt(new THREE.Vector3(0, 0, 0));

    if (this.lineCounter >= 5) {
      this.endRotation = true;
    }
    if (
      this.currentSentenceGroupArray.length > 0 &&
      this.lastSentenceIsLooking
    ) {
      this.currentSentenceGroupArray[
        this.currentSentenceGroupArray.length - 1
      ].lookAt(this.camera.camera.position);
    }

    // console.log(this.endRotation);
    if (this.endRotation == true) {
      console.log(this.distanceFromCenter);
      this.targetDistance = 50;
      this.transitionStartTime = Date.now();
      this.frameCounter++;

      this.camera.camera.position.x =
        Math.sin(this.frameCounter * 0.01) * this.distanceFromCenter;
      this.camera.camera.position.z =
        Math.cos(this.frameCounter * 0.01) * this.distanceFromCenter;
    }
    if (this.changingLineCounter != 0) {
      this.group.position.y = this.lerp(
        this.group.position.y,
        this.changingLineCounter * 1.2,
        0.01
      );
    }
  }

  lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t;
  }
}
