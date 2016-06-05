'use strict';

import React from 'react';
import Link from '../router/Link';

import { db, ref } from '../../api';
import uuid from 'node-uuid';
import defaultCharacter from '../../data/defaultCharacter';

export default React.createClass({
  displayName: 'Landing',

  getInitialState() {
    return ({
      profileId : null,
      unauthed: true,
      authenticating: false,
      err: '',
      msg: '',
    })
  },

  componentWillMount() {
    db.auth().signOut();
  },

  testLogin() {
    this.setState({ authenticating: true })
    db
      .auth()
      .signInWithEmailAndPassword('theoperatore@gmail.com', 'ralfralf')
      .then(user => {
        this.setState({ unauthed: false, profileId: user.uid });
      })
      .catch(err => {
        this.setState({ err: err.message });
      });
  },

  uploadBlank() {
    let auth = db.auth().currentUser;
    let characterId = uuid.v1();
    let characterName = this.nameInput.value.trim() || 'Blank Character';
    let characterClass = defaultCharacter.charInfo.class;
    let characterLevel = defaultCharacter.charInfo.level;
    let createdOn = Date.now();
    let characterData = Object.assign({}, defaultCharacter, {
      charName: characterName,
    });

    ref.child(`users/${auth.uid}/characters/${characterId}`).set({
      characterId,
      characterName,
      characterClass,
      characterLevel,
      createdOn,
    }).then(() => {
      return ref.child(`characters/${characterId}`).set(characterData);
    }).then(() => {
      this.setState({ msg: 'CHARACTER_OK!' });
    }).catch(err => {
      this.setState({ err: err.message });
    });
  },

  render() {
    var style = {
      "maxWidth" : 225,
      "padding" : 5
    }

    return (
      <div style={style}>
        <h1>Character</h1>
        {
          this.state.err !== ''
            ? <p style={{ color: 'red' }}>{this.state.err}</p>
            : null
        }
        {
          this.state.msg !== ''
            ? <p style={{ color: 'green' }}>{this.state.msg}</p>
            : null
        }
        { 
          this.state.unauthed
            ? <button
                disabled={this.state.authenticating}
                onClick={this.testLogin}>{this.state.authenticating ? 'logging you in...' : 'Test Authenticate'}</button>
            : <p><Link href="/profile">Go To Profile</Link></p>
        }
        <hr />
        {
          this.state.unauthed
            ? null
            : <div>
                <input
                  type='text'
                  ref={ref => this.nameInput = ref}
                  placeholder='new character name'
                />
                <button
                  onClick={this.uploadBlank}
                >Upload new character</button>
              </div>
        }
      </div>
    )
  }
})