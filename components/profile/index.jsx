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

import {
  getFile,
  getProfileAll,
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  getUrlAll,
} from '@inrupt/solid-client';
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core';

import { FOAF, VCARD } from '@inrupt/lit-generated-vocab-common';

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({});
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  // console.log('VCARD object is: ', VCARD);

  async function getProfile() {
    const profile = await getProfileAll(
      'https://jonwilson.solidcommunity.net/profile/card#me'
    );
    console.log('Profile is: ', profile);
    const webIDProfileSolidDataset = profile.webIdProfile;
    const webIdThing = getThing(
      webIDProfileSolidDataset,
      'https://jonwilson.solidcommunity.net/profile/card#me'
    );
    console.log('webIDProfileSolidDataset: ', webIDProfileSolidDataset);
    console.log('webIdThing: ', webIdThing);
    console.log(
      'picture',
      webIdThing.predicates['http://www.w3.org/2006/vcard/ns#hasPhoto']
        .namedNodes
    );
    setPicture(
      webIdThing.predicates['http://www.w3.org/2006/vcard/ns#hasPhoto']
        .namedNodes
    );
    setName(
      webIdThing.predicates['http://www.w3.org/2006/vcard/ns#fn'].literals[
        'http://www.w3.org/2001/XMLSchema#string'
      ]
    );
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <img src={picture} alt="profile image" width="200" />
      <p>{name}</p>
    </>
  );
}
