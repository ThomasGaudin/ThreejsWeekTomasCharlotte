import Config from "./Config.js";
import Speech from "speak-tts";
import EventEmitter from "@onemorestudio/eventemitterjs";
export default class Chat extends EventEmitter {
  constructor() {
    super();
    this.API_URL = "https://api.openai.com/v1/chat/completions";
    this.API_KEY = Config.OPEN_AI_KEY;
    this.messages = [];
    this.context =
      // "Tu es un specialiste sur la culture et l'art contemporain. Et tu me poses des questions. Basé sur mes réponses, tu me poses d'autres questions.Tu fais des question réponses très courtes et succinctes. Commence par me poser une question sur un quelconque sujet culturel.";
      "Agis comme un plagiste complotiste à l’esprit fermé. Tes réponses doivent être ultra courtes, maximum 3 phrases. Tu commence directement la discution par une remarque platiste. Puis tu attend ma réponse. Par la suite selon mes réponses tu vas essayer de me convaincre que tu as raison par des affirmations. Tu trouves absurde que la terre soit ronde. Tu dois être créatif. Tu es sur de toi et tu y croit a 100%. je veux que tu me parles de façon familière. tu dois être bref et rude. Ton but est de me convaicre. Continue la disscution jusqua ce que j'y croie.Je suis conscient que tu vas jouer un role et que la terre n’est pas vraiment plate ";
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log("speech synthesis supported");
    }
    this.speech
      .init({
        volume: 1,
        lang: "fr-FR",
        rate: 0.4,
        pitch: 0.6,
        voice: "Flo",
        splitSentences: true,
        listeners: {
          onvoiceschanged: (voices) => {
            // console.log("Event voiceschanged", voices);
          },
        },
      })
      .then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data);
        // this.speech.voice = "Eddy (anglais (États-Unis))";
      })
      .then(() => {
        console.log("Success !");
        //
        // this.call(this.context);
      })
      .catch((e) => {
        console.error("An error occured while initializing : ", e);
      });

    // this.init();
  }
  async init() {
    // on invente un contexte pour le chat
  }

  async call(userMessage) {
    console.log(speechSynthesis.getVoices());
    this.messages.push({
      role: "user",
      content: userMessage,
    });
    console.log("config", Config.TEXT_MODEL);
    try {
      console.log("Send message to OpenAI API");
      // Fetch the response from the OpenAI API with the signal from AbortController
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify({
          model: Config.TEXT_MODEL, // "gpt-3.5-turbo",
          messages: this.messages,
        }),
      });

      this.data = await response.json();
      // ici on attends la réponse de CHAT GPT
      console.log(this.data.choices[0].message.content);

      // on peut envoyer la réponse à l'app dans l'idée de voir si on pourrait générer une image

      this.emit("gpt_response", [this.data.choices[0].message.content]);
      this.activeString = "";

      // //on peut faire parler le bot
      // this.speech
      //   .speak({
      //     text: data.choices[0].message.content,
      //     listeners: {
      //       onstart: () => {
      //         // console.log("Start utterance");
      //       },
      //       onend: () => {
      //         // console.log("End utterance");
      //       },
      //       onresume: () => {
      //         // console.log("Resume utterance");
      //       },
      //       onboundary: (event) => {
      //         this.extractWord(event);
      //       },
      //     },
      //   })
      //   .then(() => {
      //     // console.log("This is the end my friend!");
      //     this.emit("speechEnd", [data]);
      //   });
    } catch (error) {
      console.error("Error:", error);
      resultText.innerText = "Error occurred while generating.";
    }
  }

  launchSpeech(text) {
    //on peut faire parler le bot

    console.log("from speech", text);
    this.speech
      .speak({
        text: text,
        listeners: {
          onstart: () => {
            // console.log("Start utterance");
          },
          onend: () => {
            // console.log("End utterance");
          },
          onresume: () => {
            // console.log("Resume utterance");
          },
          onboundary: (event) => {
            this.extractWord(event);
          },
        },
      })
      .then(() => {
        // console.log("This is the end my friend!");
        this.emit("speechEnd", [this.data]);
      });
  }

  extractWord(event) {
    console.log(event);
    const index = event.charIndex;

    // const word = event.target.text.slice(
    //   event.charIndex,
    //   event.charIndex + event.charLength
    // );

    const word = this.getWordAt(event.target.text, index);
    console.log(word);
    this.emit("word", [word]);
  }

  // Get the word of a string given the string and index
  getWordAt(str, pos) {
    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning and end.
    let left = str.slice(0, pos + 1).search(/\S+$/);
    let right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
      return str.slice(left);
    }

    // Return the word, using the located bounds to extract it from the string.
    return str.slice(left, right + pos);
  }
}
