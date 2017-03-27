import React, { Component } from 'react';
import $ from 'jquery';

const raterStyle = {
  border: '2px solid gray'
}


class RateBartender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // note Maybe break up into separate objects
      bartender: props.bartender.name,
      id: props.bartender.id,
      reviewer: 'TEST',
      expert_right: 0,
      expert_left: 0,
      friendly_right: 0,
      friendly_left: 0,
      quick_right: 0,
      quick_left: 0,
      hot: false,
      hook: false,
      expertSelect: 'Please click 👎 or 👍 to rate this Metric',
      friendlySelect: 'Please click 👎 or 👍 to rate this Metric',
      quickSelect: 'Please click 👎 or 👍 to rate this Metric',
      hotSelect: 'Is you bartender hot?',
      hookSelect: 'Does your bartender hook you up (with free drinks)?'

    }
  }

  submitRating() {
    var context = this;
    $('#rater').hide();
    $('#ratingconf').show();
    $('#ratebutton').show();
    $('#friendly').show();
    $('#quick').show();
    $('#expert').show();

    this.setState({
      expertSelect: 'Please click 👎 or 👍 to rate this Metric',
      friendlySelect: 'Please click 👎 or 👍 to rate this Metric',
      quickSelect: 'Please click 👎 or 👍 to rate this Metric',
      hookSelect: 'Is you bartender hot?',
      hotSelect: 'Does your bartender hook you up (with free drinks)?'
    });

    console.log(context.state);
    
  }

  upvoteExpertise () {  
    var context = this;
    this.setState({
      expertSelect: 'Thanks for voting 👍 on ' + this.state.bartender + '\'s Expertise!'
    });
    console.log(context.state.id);
    
    var data = {
      side: 'right',
      bartenderID: context.state.id,
      aspect: 'expert_right'
    };

   $.ajax({
      url: '/rate',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'text/plain',
      success: function(result) {
        console.log('ADDED 1 to expert_right');
      },
      error: function(err) {
        console.log(err);
      }
    });

    $('#expert').hide();
  }

  downvoteExpertise () { 
    var context = this;

    this.setState({
      expertSelect: 'Sorry you voted 👎 on ' + this.state.bartender + '\'s Expertise!'
    });

    var data = {
      side: 'left',
      bartenderID: context.state.id,
      aspect: 'expert_left'
    };

    $.ajax({
      url: '/rate',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'text/plain',
      success: function(result) {
        console.log('ADDED 1 to expert_left');
      },
      error: function(err) {
        console.log(err);
      }
    });

    $('#expert').hide();
  }


  upvoteFriendly () { 
    var context = this;
    this.setState({
      friendlySelect: 'Thanks for voting 👍 on ' + this.state.bartender + '\'s Friendliness!'
    });

    var data = {
      side: 'right',
      bartenderID: context.state.id,
      aspect: 'friendly_right'
    };

    $.ajax({
      url: '/rate',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'text/plain',
      success: function(result) {
        console.log('ADDED 1 to friendly_right');
      },
      error: function(err) {
        console.log(err);
      }

    });

    $('#friendly').hide();
  }

  downvoteFriendly () {
    var context = this;
    this.setState({
      friendlySelect: 'Sorry you voted 👎 on ' + this.state.bartender + '\'s Friendliness!'
    });

    var data = {
      side: 'left',
      bartenderID: context.state.id,
      aspect: 'friendly_left'
    };

    $.ajax({
      url: '/rate',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'text/plain',
      success: function(result) {
        console.log('ADDED 1 to friendly_left');
      },
      error: function(err) {
        console.log(err);
      }
    });

    $('#friendly').hide();
  }

  upvoteQuick () {
    var context = this;
    
    this.setState({
      quickSelect: 'Thanks for voting 👍 on ' + this.state.bartender + '\'s Speed!'
    });

    var data = {
      side: 'right',
      bartenderID: context.state.id,
      aspect: 'quick_right'
    };

    $.ajax({
      url: '/rate',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'text/plain',
      success: function(result) {
        console.log('ADDED 1 to quick_right');
      },
      error: function(err) {
        console.log(err);
      }
    });



    $('#quick').hide();
  }

  downvoteQuick () {
    var context = this;
    this.setState({
      quickSelect: 'Sorry you voted 👎 on ' + this.state.bartender + '\'s Speed!'
    });

    var data = {
      side: 'left',
      bartenderID: context.state.id,
      aspect: 'quick_left'
    };

    $.ajax({
      url: '/rate',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'text/plain',
      success: function(result) {
        console.log('ADDED 1 to quick_left');
      },
      error: function(err) {
        console.log(err);
      }
    });


    $('#quick').hide();
  }

  ratePepper () {
    var context = this;
    this.setState({
      hotSelect: 'Thanks for passing 🌶 Props!'
    });

    $('#pepper').hide();
  }

  rateHook () {
    var context = this;
    this.setState({
      hookSelect: 'Thanks for passing 🎣 Props!'
    });


    $('#hook').hide();
  }


  componentDidMount() { 
    
  }

  render() {
    // TODO figure out a way to display currently selected thing (possible Radio buttons)
    return (
      <div style={raterStyle} id="rater" className='container'>
        <h4>How would you rate {this.state.bartender.name}?</h4>
        <span>{this.state.expertSelect}</span><br />
        <div id="expert"> 
          <button onClick={this.downvoteExpertise.bind(this)} className='btn btn-danger'>👎</button>-----EXPERTISE-----<button onClick={this.upvoteExpertise.bind(this)} className='btn btn-success'>👍</button><br />
        </div>
        <span>{this.state.friendlySelect}</span><br />
        <div id="friendly"> 
          <button onClick={this.downvoteFriendly.bind(this)} className='btn btn-danger'>👎</button>-----FRIENDLINESS-----<button onClick={this.upvoteFriendly.bind(this)} className='btn btn-success'>👍</button><br />
        </div>
        <span>{this.state.quickSelect}</span><br />
        <div id="quick">
          <button onClick={this.downvoteQuick.bind(this)} className='btn btn-danger'>👎</button>-----SPEED-----<button onClick={this.upvoteQuick.bind(this)} className='btn btn-success'>👍</button><br />
        </div>
        <h5>Pass Props: </h5>
          <span>{this.state.hotSelect}</span><br />
          <div id="pepper">
            <button onClick={this.ratePepper.bind(this)} className='btn btn-success'>🌶</button><br />
          </div>
          <span>{this.state.hookSelect}</span><br />
        <div id="hook">
          <button onClick={this.rateHook.bind(this)} className='btn btn-success'>🎣</button><br />
        </div>
        <h5>Click Below To Sumbit</h5>
        <button onClick={this.submitRating.bind(this)} className='btn btn-primary'>Submit Rating</button>
      </div>

    )
  }
}

export default RateBartender;