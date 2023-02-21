/**
 * Copyright 2021 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, { useState, useEffect } from 'react';
import preset from 'jss-preset-default';
import {
  addUrl,
  addStringNoLocale,
  buildThing,
  createSolidDataset,
  createThing,
  getFile,
  getPodUrlAll,
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrlAll,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client';
import { SCHEMA_INRUPT } from '@inrupt/vocab-common-rdf';
import {
  handleIncomingRedirect,
  fetch,
  getDefaultSession,
} from '@inrupt/solid-client-authn-browser';
import Header from '../header';
import Nav from '../nav';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* eslint react/prop-types: 0 */
function AppContainer({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const session = getDefaultSession();

  // Check if user is logged in and get list of members from mn-solid pod
  async function checkLogin() {
    await handleIncomingRedirect({ restorePreviousSession: true }).then(
      (info) => {
        console.log(`Logged in with WebID ${info?.webId}`);
      }
    );
    if (session.info.isLoggedIn) {
      setLoggedIn(true);
    }
    const mnSolidPods = await getPodUrlAll(
      'https://mnsolidproject.solidcommunity.net/profile/card#me'
    );
    console.log('mnSolidPods', mnSolidPods);
    const myDataset = await getSolidDataset(
      'https://mnsolidproject.solidcommunity.net/public/'
    );
    console.log('myDataset', myDataset);
    const membersList = await getFile(
      'https://mnsolidproject.solidcommunity.net/public/members.json'
    );
    const membersText = await membersList.text();
    console.log('members', membersText);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <CssBaseline>
      <Header />
      <main>{children}</main>
    </CssBaseline>
  );
}

export default AppContainer;
