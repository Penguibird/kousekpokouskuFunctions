/* eslint-disable */
import * as functions from "firebase-functions";

import * as admin from 'firebase-admin'
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
export const incrementValue = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    if (!original) return;

    const number = Number.parseInt(original.toString())

    const dbState = await admin.firestore().collection("jurta").doc("jurta").get();
    const numberInDb: number = dbState.data()?.number;
    const writeResult = await admin.firestore().collection("jurta").doc("jurta").update({ number: numberInDb + number })

    res.end(writeResult.toString());
});
export const setValue = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    if (!original) return;
    const number = Number.parseInt(original.toString())

    const writeResult = await admin.firestore().collection("jurta").doc("jurta").update({ number: number })

    res.end(writeResult.toString());
});

export const readValue = functions.https.onRequest(async (req, res) => {

    const dbState = await admin.firestore().collection("jurta").doc("jurta").get();
    const numberInDb: number = dbState.data()?.number;

    res.end(numberInDb.toString());
});

