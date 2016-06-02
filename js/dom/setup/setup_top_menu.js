const app = require('../../app');
const Server = require('../../server');
const Toast = require('../toast');

module.exports = () => {

  // shared
  $('#shared').mouseup(function() {
    $(this).select();
  });

  $('#btn_share').click(function() {

    const $icon = $(this).find('.fa-share');
    $icon.addClass('fa-spin fa-spin-faster');

    Server.shareScratchPaper().then((url) => {
      $icon.removeClass('fa-spin fa-spin-faster');
      $('#shared').removeClass('collapse');
      $('#shared').val(url);
      Toast.showInfoToast('Shareable link is created.');
    });
  });

  // control

  $('#btn_run').click(function() {
    $('#btn_trace').click();
    $('#btn_pause').removeClass('active');
    $(this).addClass('active');
    var err = app.getEditor().execute();
    if (err) {
      console.error(err);
      Toast.showErrorToast(err);
    }
  });
  $('#btn_pause').click(function() {
    $('#btn_run').removeClass('active');
    $(this).addClass('active');
    if (app.getTracerManager().isPause()) {
      app.getTracerManager().resumeStep();
    } else {
      app.getTracerManager().pauseStep();
    }
  });
  $('#btn_prev').click(() => {
    $('#btn_run').removeClass('active');
    $('#btn_pause').addClass('active');
    app.getTracerManager().pauseStep();
    app.getTracerManager().prevStep();
  });
  $('#btn_next').click(() => {
    $('#btn_run').removeClass('active');
    $('#btn_pause').addClass('active');
    app.getTracerManager().pauseStep();
    app.getTracerManager().nextStep();
  });

  // description & trace

  $('#btn_desc').click(function() {
    $('.tab_container > .tab').removeClass('active');
    $('#tab_desc').addClass('active');
    $('.tab_bar > button').removeClass('active');
    $(this).addClass('active');
  });

  $('#btn_trace').click(function() {
    $('.tab_container > .tab').removeClass('active');
    $('#tab_module').addClass('active');
    $('.tab_bar > button').removeClass('active');
    $(this).addClass('active');
  });

};
