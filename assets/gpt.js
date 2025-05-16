function jsonfunc() {

    setTimeout(function () {

        //type it out https://jsfiddle.net/andrevenancio/6beq2ogd
        function TextAnimation(text, opt_domElement) {
            this.text = text;
            this.curChar = 0;
            this.inTimeout = 0;
            this.outTimeout = 0;
            this.domElement = opt_domElement || this.createDomElement();
        }

        TextAnimation.prototype.createDomElement = function () {
            const elem = document.getElementById("gptansmod");
            elem.className = "blink";
            elem.innerHTML = " ";
            // document.body.appendChild(elem);
            document.getElementById("gptansmod").innerHTML = elem;
            return elem;
        };

        TextAnimation.prototype.getDelay = function (char, isLastChar = false) {
            let delay = this.delay;
            switch (char) {
                case " ":
                    delay = 10;
                    break;
                    //jg dealing with slashes/\ and <>
                    case "/":
                    case "\\":
                    case "<":  
                    case ">":
                    case "</text>": 
                    case "<BR>": 
                    case "🔊":
                    delay = 10;
                    break;

                case ",":
                    delay = 100;
                    break;
                case ".":
                case "!":
                case "?":
                    delay = 500;
                    break;
                default:
                    delay = 50;
            }

            if (isLastChar) {
                delay = 0;
            }
            return delay;
        };

        TextAnimation.prototype.type = function (callback) {
            this.curChar++;
            this.domElement.innerHTML = this.text.substr(0, this.curChar);
            if (this.curChar < this.text.length + 1) {
                const prevChar = this.text.substr(this.curChar - 1, 1);
                this.inTimeout = setTimeout(
                    function () {
                        this.type(callback);
                    }.bind(this),
                    this.getDelay(prevChar, this.curChar === this.text.length)
                );
            } else {
                this.curChar = this.text.length;
                callback();
                return;
            }
            // console.log('type', this.curChar);
        };

        TextAnimation.prototype.erase = function (callback) {
            this.curChar--;
            this.domElement.innerHTML = this.text.substr(0, this.curChar);
            if (this.curChar >= 0) {
                this.outTimeout = setTimeout(
                    function () {
                        this.erase(callback);
                    }.bind(this),
                    20
                );
            } else {
                this.curChar = 0;
                callback();
                return;
            }
            // console.log('erase', this.curChar);
        };

        TextAnimation.prototype.stopCurrentAnimation = function () {
            clearTimeout(this.inTimeout);
            clearTimeout(this.outTimeout);
        };

        TextAnimation.prototype.animateIn = function (callback = () => { }) {
            this.stopCurrentAnimation();
            this.type(callback);
        };

        TextAnimation.prototype.animateOut = function (callback = () => { }) {
            this.stopCurrentAnimation();
            this.erase(callback);
        };

        console.clear();


        function urlify(textconvertedurl) {
            var urlRegex0 = /\b(http|https?:\/\/)?([a-z0-9-]+\.)+(com|aero|asia|biz|cat|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(\/\S*)?(\?[a-zA-Z0-9_]+=[a-zA-Z0-9_]+&?)*(\#[a-zA-Z0-9_]+)?\b/;
            //had to fix the linking so \b bounday would work with textconvertedurl.replace method, see https://stackoverflow.com/a/60139198
            var urlRegex = new RegExp(urlRegex0, "g");
            //  var urlRegex =  '#\b(http|https?://)?([a-z0-9-]+\.)+(com|org|net|edu)\b#i'
            return textconvertedurl.replace(urlRegex, function (url) {
                if (!/^http|https?:\/\//i.test(url)) { //if URL does not contain http or https
                    //variable assigment needs to be in this order, or var url1 would inherit the new var url
                    var url1 = url;
                    var url = 'https://' + url;

                }
                else {
                    var url1 = url;
                    var url = url;

                }
                return '<a target="_blank" href="' + url + '">' + url1 + '</a>';
            })
            // or alternatively
            // return text.replace(urlRegex, '<a href="$1">$1</a>')
        }
        function urlifyint() {

            //setTimeout(function () {

            const jsonString = document.getElementById("gptans").innerHTML;

           // const jsonObject = JSON.parse(jsonString);

            ///console.log(jsonObject.id);

           // var textconvertedurl = jsonObject.choices[0].text;
            var html = urlify(jsonString);

            //check token usage
           // console.log(jsonObject.usage.prompt_tokens);

            return html;
            //}, 0);

        }







        //start type writer animation
        const question = "<text style='font-size: 120%;'><B>GPT: </B></text><text id='output'>" + urlifyint() + "</text><BR><BR><text id='scrollto' style='font-size: 120%;'><B>GPT: </B><\/text>Performing Google search. Loading...";
        const foo = new TextAnimation(question);
        document.getElementById("gptansmod").innerHTML = foo;
        
        //texttospeech needs to be inserted after animation otherwise clicking on texttospeech does not work, the animation(JS) needs to be completed in its entirity before the speakit()(or any other function for that matter) can be called
        foo.animateIn(() => {    $("<text id='texttospeech' onclick='speakit();' style='cursor:pointer' >🔊</text>").insertAfter("#output");loadgoogle(); googlescrollto(); });
        // Output: "\nRemember to always submit your commands in the format specified above. One command per line, no trailing"

        //console.log(jsonObject.usage.prompt_tokens);
        // Output: 430
        //In the code above, we first define a string containing the JSON data. Then, we use the JSON.parse() method to convert the string into a JavaScript object. Finally, we use dot notation to access the properties of the object and print them to the console.


    }, 0);///}
}


function speakit() {
    var message = new SpeechSynthesisUtterance($("#output").text());
    speechSynthesis.speak(message);
}

//scroll to on Google Results
function googlescrollto() {
    // window.location.href = "#scrollto";

    //e.preventDefault();
    // e.stopPropagation();
    $("html, body").animate({ scrollTop: (document.getElementById("scrollto").offsetTop) + "px" }, 1500); //https://stackoverflow.com/a/4249365

}


//load google results
function loadgoogle() {
    document.getElementById("webresult").style.display = "block";
    //document.getElementById("webresult").src = "https://www.google.com/search?q=" + document.URL.split("?q=")[1] + "&useragent=Mozilla%2F5.0+%28Linux%3B+Android+7.1.1%3B+Nexus+6+Build%2FN6F27M%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F66.0.3359.106+Mobile+Safari%2F537.36&filter=0&gws_rd=cr&newwindow=1&igu=1#mmc=1";

    document.getElementById("webresult").src = "https://google.gprivate.com/search0.php?search?q=" + document.URL.split("?q=")[1];
}


//disable right click
//document.addEventListener('contextmenu', event => event.preventDefault());




