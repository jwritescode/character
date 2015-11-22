"use strict";

import React from 'react/addons';
import Immutable from 'immutable';

import ListItem from '../components/ListItem';

var Panel = require('../components/Panel');
var Shell = require('../components/Shell');
var SwipePanes = require('../components/SwipePanes');
var SwipePane = require('../components/SwipePane');
var SettingsWell = require('../components/SettingsWell');
var Tabs = require('../components/Tabs');
var Tab = require('../components/Tab');
var Icon = require('../components/Icon');
var MoneyChart = require('../components/MoneyChart');
var HPBar = require('../components/HPBar');
var Shield = require('../components/Shield');
var Stat = require('../components/Stat');
var Switch = require('../components/Switch');
var Menu = require('../components/Menu');
var SpellCircle = require('../components/SpellCircle');
var Button = require('../components/Button');
var Popover = require('../components/Popover');


var mockSkills = require('../dummy/character-skills');
var mockEquipment = require('../dummy/character-equipment');
var mockHps = require('../dummy/character-hitpoints');
var mockSpells = require('../dummy/character-spells');


module.exports = React.createClass({
  displayName : "StyleGuide",
  getInitialState : function() {
    return ({
      skillsData : Immutable.fromJS(mockSkills),
      skillsSort : true,
      equipData : Immutable.fromJS(mockEquipment),
      hpData : Immutable.fromJS(mockHps),
      settingsWellOpen : false,
      switchActive : false,
      characterName : 'Click Me',
      spellsData : Immutable.fromJS(mockSpells),
      spellSlotSelected : 9
    })
  },

  toggleSettingsWell : function() {
    this.setState({ settingsWellOpen : !this.state.settingsWellOpen });
  },

  toggleSkillsSort : function() {
    this.setState({ skillsSort : !this.state.skillsSort });
  },

  toggleSwitch : function() {
    this.setState({ switchActive : !this.state.switchActive });
  },

  handleUserInput : function(val) {
    console.log(val);
    this.setState({ characterName : val });
  },

  handleUserInputEnd : function(val) {
    console.log('end', val);
    this.setState({ characterName : val });
  },

  handleSpellSlotSelect : function(d, i) {
    console.log(`slot ${i} is now open`);
    this.setState({ spellSlotSelected : i });
  },

  randomizeGold : function() {
    var data = this.state.equipData;

    data = data.updateIn(['money', 'cp'], () => Math.round(Math.random() * 50));
    data = data.updateIn(['money', 'sp'], () => Math.round(Math.random() * 50));
    data = data.updateIn(['money', 'gp'], () => Math.round(Math.random() * 50));
    data = data.updateIn(['money', 'ep'], () => Math.round(Math.random() * 50));
    data = data.updateIn(['money', 'pp'], () => Math.round(Math.random() * 50));

    this.setState({ equipData : data });
  },

  randomizeHP : function() {
    var data = this.state.hpData;
    var max = this.state.hpData.get('maximum');
    var cur = Math.round(Math.random() * max);
    var tmp = Math.round(Math.random() * max);

    data = data.update('current', () => cur);
    data = data.update('temporary', () => tmp);

    this.setState({ hpData : data });
  },

  augmentSkills : function() {
    var out = [];

    mockSkills.forEach((skill) => {
      var tmp = {};

      tmp.name = skill.name;
      tmp.score = Math.ceil((Math.random() * 8));
      tmp.trained = skill.trained;
      tmp.mod = skill.mod;

      out.push(tmp)
    })

    this.setState({skillsData : Immutable.fromJS(out)});
  },

  closeListItem(ev) {
    this.refs.listItem.close();
    ev.stopPropagation();
    ev.preventDefault();
  },

  render : function() {
    return (
      <div className="container main-content">
        <section>
          <h1>Headings 1</h1>
          <h2>Headings 2</h2>
          <h3>Headings 3</h3>
          <h4>Headings 4</h4>
          <h5>Headings 5</h5>
          <h6>Headings 6</h6>
        </section>
        <hr />
        <section>
          <p><strong>Colors</strong></p>
          <span className="square bg-blue"></span>
          <span className="square bg-gold"></span>
          <span className="square bg-red"></span>
          <span className="square bg-green"></span>
          <p className="text-blue">Text Colors</p>
          <p className="text-gold">Text Colors</p>
          <p className="text-red">Text Colors</p>
          <p className="text-green">Text Colors</p>
        </section>
        <hr />
        <section>
          <p><strong>Buttons</strong></p>
          <div>
            <Button><span>Default</span></Button>
          </div>
          <div>
            <Button size="sm" ><span>Small</span></Button>
            <Button size="md" ><span>Medium</span></Button>
            <Button size="lg" ><span>Large</span></Button>
          </div>
          <div>
            <Button style="blue" ><span>Blue</span></Button>
            <Button style="green" ><span>Green</span></Button>
            <Button style="red" ><span>Red</span></Button>
            <Button style="gold" ><span>Gold</span></Button>
          </div>
        </section>
        <hr />
        <section>
          <p><strong>Collapsing Panels</strong></p>
          <Panel header={"Click Me 1"}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
          </Panel>
          <Panel header={"Click Me 2"}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
          </Panel>
          <Panel header={"Click Me 3"}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
          </Panel>

        </section>
        <hr />
        <section>
          <p><strong>ListItems</strong></p>
          <ListItem glyph={<Icon icon='icon-attack' />} glyphCss='text-red'>
            <p>Item 1</p>
          </ListItem>
          <ListItem glyph={<Icon icon='icon-attack' />} glyphCss='text-red'>
            <p>Item 2</p>
          </ListItem>
          <ListItem>
            <p>Item no glyph</p>
          </ListItem>
          <ListItem glyph={<Icon icon='icon-repo' />} glyphCss='text-blue' content={
            <section>
              <div className='modal-header'>
                <h3>A long modal</h3>
              </div>
              <div className='modal-content'>
                <p>Some really cool content</p>
                <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia purus vitae diam porta efficitur. Duis augue mauris, gravida a felis sed, placerat dictum magna. Ut a enim vitae sapien auctor pellentesque eu sed erat. Cras eget eros placerat augue suscipit pharetra a eu metus. Aliquam accumsan, urna ut fermentum placerat, ligula elit maximus eros, et gravida enim orci vitae nunc. Duis rhoncus dolor non sagittis dignissim. Phasellus vitae est arcu. Aenean fermentum ligula diam, non ullamcorper tortor euismod id. Ut molestie nisl bibendum ex scelerisque volutpat. Vestibulum ullamcorper justo lacinia lectus ultricies dignissim. Nunc vitae ullamcorper diam. Nunc nec gravida ante, id fringilla magna. </p>
                <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia purus vitae diam porta efficitur. Duis augue mauris, gravida a felis sed, placerat dictum magna. Ut a enim vitae sapien auctor pellentesque eu sed erat. Cras eget eros placerat augue suscipit pharetra a eu metus. Aliquam accumsan, urna ut fermentum placerat, ligula elit maximus eros, et gravida enim orci vitae nunc. Duis rhoncus dolor non sagittis dignissim. Phasellus vitae est arcu. Aenean fermentum ligula diam, non ullamcorper tortor euismod id. Ut molestie nisl bibendum ex scelerisque volutpat. Vestibulum ullamcorper justo lacinia lectus ultricies dignissim. Nunc vitae ullamcorper diam. Nunc nec gravida ante, id fringilla magna. </p>
                <textarea></textarea>
                <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia purus vitae diam porta efficitur. Duis augue mauris, gravida a felis sed, placerat dictum magna. Ut a enim vitae sapien auctor pellentesque eu sed erat. Cras eget eros placerat augue suscipit pharetra a eu metus. Aliquam accumsan, urna ut fermentum placerat, ligula elit maximus eros, et gravida enim orci vitae nunc. Duis rhoncus dolor non sagittis dignissim. Phasellus vitae est arcu. Aenean fermentum ligula diam, non ullamcorper tortor euismod id. Ut molestie nisl bibendum ex scelerisque volutpat. Vestibulum ullamcorper justo lacinia lectus ultricies dignissim. Nunc vitae ullamcorper diam. Nunc nec gravida ante, id fringilla magna. </p>
                <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia purus vitae diam porta efficitur. Duis augue mauris, gravida a felis sed, placerat dictum magna. Ut a enim vitae sapien auctor pellentesque eu sed erat. Cras eget eros placerat augue suscipit pharetra a eu metus. Aliquam accumsan, urna ut fermentum placerat, ligula elit maximus eros, et gravida enim orci vitae nunc. Duis rhoncus dolor non sagittis dignissim. Phasellus vitae est arcu. Aenean fermentum ligula diam, non ullamcorper tortor euismod id. Ut molestie nisl bibendum ex scelerisque volutpat. Vestibulum ullamcorper justo lacinia lectus ultricies dignissim. Nunc vitae ullamcorper diam. Nunc nec gravida ante, id fringilla magna. </p>
                <input type='text' placeholder='enter some cool text' />
              </div>
            </section>
          }>
            <p>Item 3</p>
          </ListItem>
          <ListItem ref='listItem' glyph={<Icon icon='icon-attack' />} glyphCss='text-red' content={
            <section>
              <div className='modal-header'>
                <h3>A modal</h3>
              </div>
              <div className='modal-content'>
                <p>Some really cool content</p>
                <input type='text' placeholder='enter some cool text' />
              </div>
              <div className='modal-footer'>
                <Button style='red' onClick={this.closeListItem}><span>Close</span></Button>
                <Button style='green' onClick={this.closeListItem}><span>Ok</span></Button>
              </div>
            </section>
          }>
            <p><strong>Item 4</strong></p>
          </ListItem>
        </section>
        <hr />
        <section>
          <p><strong>Settings Wells</strong></p>
          <Button onClick={this.toggleSettingsWell}>Toggle</Button>
          <SettingsWell open={this.state.settingsWellOpen}>
            <div className="container-fluid">
              <h2>Change things</h2>
              <p>This is where you'll do it</p>
              <input type="text" className="input form-input" placeholder="Some Box..." />
            </div>
          </SettingsWell>
        </section>
        <hr />
        <section className='clearfix'>
          <p><strong>Popovers</strong></p>
          <div className="text-center">
            <Popover popover={<div><p style={{'textAlign':'center'}}>A basic Popover</p><p>asdfasdfasdf asdf asdf saf sadf sadf asdf sdaf sadf sadf sadf sadf asdfasdf asd fsdaf sadf asdf ;laksdj f;laskjf ;alskdf ;alskfj ;alksj f;laskdf ;lsakfj ;laskfj ;alskdjf ;lsakj f;</p></div>}>
              <Button>Toggle</Button>
            </Popover>
          </div>
          <div>
            <Popover popover={<div><p style={{'textAlign':'center'}}>A basic Popover</p><p>asdfasdfasdf asdf asdf saf sadf sadf asdf sdaf sadf sadf sadf sadf asdfasdf asd fsdaf sadf asdf ;laksdj f;laskjf ;alskdf ;alskfj ;alksj f;laskdf ;lsakfj ;laskfj ;alskdjf ;lsakj f;</p></div>}>
              <Button>Toggle</Button>
            </Popover>
          </div>
        </section>
        <hr />
        <section>
          <p><strong>Swipe Panes</strong></p>
          <SwipePanes activeIdx={0} onSlideChangeEnd={(s) => console.log("end", s)}>
            <SwipePane title={"Title 1"}>
              <p>Swipe Me 1</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </SwipePane>
            <SwipePane title={"Title 2"}>
              <p>Swipe Me 2</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </SwipePane>
            <SwipePane title={"Title 3"}>
              <p>Swipe Me 3</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </SwipePane>
          </SwipePanes>
        </section>
        <hr />
        <section>
          <p><strong>Justifed Tabs and Icons</strong></p>
          <Tabs activeIdx={2}>
            <Tab><Icon icon="icon-crown" /></Tab>
            <Tab><Icon icon="icon-features" /></Tab>
            <Tab><Icon icon="icon-chart" /></Tab>
            <Tab><Icon icon="icon-shield" /></Tab>
            <Tab><Icon icon="icon-attack" /></Tab>
            <Tab><Icon icon="icon-repo" /></Tab>
            <Tab><Icon icon="icon-equipment"/></Tab>
          </Tabs>
        </section>
        <hr />
        <section>
          <p><strong>SVG Shell</strong></p>
          <Button onClick={this.augmentSkills}>randomize</Button>
          <Button onClick={this.toggleSkillsSort}>toggle sort</Button>
          <Shell data={this.state.skillsData} sort={this.state.skillsSort} />
        </section>
        <hr />
        <section>
          <p><strong>Currency</strong></p>
          <Button onClick={this.randomizeGold}>randomize</Button>
          <MoneyChart data={this.state.equipData.get('money')} />
        </section>
        <hr />
        <section>
          <p><strong>HP Bar</strong></p>
          <Button onClick={this.randomizeHP}>randomize</Button>
          <HPBar data={this.state.hpData} onClick={this.randomizeHP}/>
        </section>
        <hr />
        <section>
          <p><strong>Shield</strong></p>
          <Shield data={this.state.hpData} />
        </section>
        <hr />
        <section>
          <p><strong>Stats</strong></p>
          <p><Stat title="STR" score={2} subtitle={14} background={true} /></p>
          <p><Stat title="TRAINED" score={2} background={true} trained={true}/></p>
        </section>
        <hr />
        <section>
          <p><strong>Switches</strong></p>
          <Switch active={this.state.switchActive} onClick={this.toggleSwitch} />
        </section>
        <hr />
        <section>
          <p><strong>Menu</strong></p>
          <Menu anchor={<Icon icon="icon-cog" />}>
            <div>Link 1</div>
            <div>Another Link for Stuff</div>
            <div>The last link that is really long and possibly going to get cut off</div>
          </Menu>
        </section>
        <hr />
        <section>
          <p><strong>SpellCircle</strong></p>
          <SpellCircle data={this.state.spellsData} onSpellSlotSelect={this.handleSpellSlotSelect}/>
          <SettingsWell open={this.state.spellSlotSelected === 0}>
            <div>
              <h4>Level 1 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 1}>
            <div>
              <h4>Level 2 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 2}>
            <div>
              <h4>Level 3 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 3}>
            <div>
              <h4>Level 4 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 4}>
            <div>
              <h4>Level 5 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 5}>
            <div>
              <h4>Level 6 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 6}>
            <div>
              <h4>Level 7 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 7}>
            <div>
              <h4>Level 8 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 8}>
            <div>
              <h4>Level 9 spell slots</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
          <SettingsWell open={this.state.spellSlotSelected === 9}>
            <div>
              <h4>Cantrips</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </div>
          </SettingsWell>
        </section>
      </div>
    );
  }
})
