

$(document).ready(function(){
    
    var expectedLength = null;
    
    //
    //  jPlayer
    //    
    $("#jquery_jplayer_1").jPlayer({
      ready: function () {
        $(this).jPlayer("setMedia", {
          title: "Bubble",
          m4a: "./speech.m4a",
        });
      },
      cssSelectorAncestor: "#jp_container_1",
      swfPath: "/js",
      supplied: "m4a, oga",
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      remainingDuration: true,
      toggleDuration: true,
      timeupdate: function(event){
          time = event.jPlayer.status.currentTime
          text = $('.timed-text')
          if(text.length == 0){
              return;
          }
          for(i=0;i<text.length;i ++){
              if(parseFloat($(text[i]).data('start')) < time && parseFloat($(text[i]).data('end')) > time){
                $(text[i]).css('color', 'red')
              } else {
                $(text[i]).css('color', 'black')
              }
          }
      }
    });
    
    document.getElementById('fileinput').onchange = function(){
        file = document.getElementById('fileinput').files[0]
        fr = new FileReader();
        fr.onload = function(){
            $('#text-display').html('')
            words = fr.result.split('\n');
            for (i in words) {
                wordTiming = words[i].split(' ');
                if(wordTiming.length != 3){
                    continue
                }
                textSpan = $(document.createElement('span'));
                $('#text-display').append(textSpan)
                textSpan.addClass('timed-text')
                textSpan.html(wordTiming[2])
                textSpan.attr('data-start', wordTiming[0])
                textSpan.attr('data-end', parseFloat(wordTiming[0]) + parseFloat(wordTiming[1]))
                expectedLength = parseFloat(wordTiming[0]) + parseFloat(wordTiming[1])
            }
        }
        fr.readAsText(file)
    };
    
    $('#text-display').on('click', '.timed-text', function(){
        starttime = $(this).data('start');
        percent = parseFloat(starttime) / expectedLength;
        $('#jquery_jplayer_1').jPlayer("playHead", percent * 100);
    });
    
});

  
  