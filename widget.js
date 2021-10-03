'use strict';

// Building components
var video = document.createElement("video");
video.id = "camera-stream";
video.style.display = "none";
video.autoplay = true;

var widget = document.createElement("div");
widget.id = "webcam-widget"

var controls = document.createElement("div");
controls.id = "webcam-controls"
controls.style.display = "none";

var back_contols = document.createElement("a");
back_contols.id = "back-controls";
back_contols.href = "#";
back_contols.innerHTML = "<span class=\"material-icons-round\" style=\"font-size: 18px\">arrow_back_ios</span><p id=\"back-controls-text\"> Back</p>"
var titlestep = document.createElement("h2");
titlestep.innerHTML = "Adjust the Image";
var DP_input = document.createElement("input");
DP_input.type = "text";
DP_input.id = "DP-input";
DP_input.value = 62;

var slider_size = document.createElement("div");
slider_size.id = "slider-size";
var slider_size_handle = document.createElement("div");
slider_size_handle.id = "slider-size-handle";
slider_size_handle.className = "ui-slider-handle";

var slider_rotation = document.createElement("div");
slider_rotation.id = "slider-rotation";
var slider_rotation_handle = document.createElement("div");
slider_rotation_handle.id = "slider-rotation-handle";
slider_rotation_handle.className = "ui-slider-handle";

var take_photo_btn_link = document.createElement("a");
take_photo_btn_link.id = "take-photo-btn-link";
take_photo_btn_link.href = "#";
take_photo_btn_link.style.display = "none";

var take_photo_btn = document.createElement("div");
take_photo_btn.id = "take-photo-btn";

var take_photo_btn_icon = document.createElement("span");
take_photo_btn_icon.id = "take-photo-btn-icon";
take_photo_btn_icon.innerHTML = "add_a_photo";
take_photo_btn_icon.className = "material-icons-round";

var take_photo_btn_text = document.createElement("p");
take_photo_btn_text.id = "take-photo-btn-text";
take_photo_btn_text.innerHTML = "Take a photo";

var delete_photo_btn_link = document.createElement("a");
delete_photo_btn_link.id = "delete-photo-btn-link";
delete_photo_btn_link.href = "#";
delete_photo_btn_link.style.display = "none";

var delete_photo_btn = document.createElement("div");
delete_photo_btn.id = "delete-photo-btn";

var delete_photo_btn_icon = document.createElement("span");
delete_photo_btn_icon.id = "delete-photo-btn-icon";
delete_photo_btn_icon.innerHTML = "add_a_photo";
delete_photo_btn_icon.className = "material-icons-round";

var delete_photo_btn_text = document.createElement("p");
delete_photo_btn_text.id = "delete-photo-btn-text";
delete_photo_btn_text.innerHTML = "Retake";

var error_header = document.createElement("h3");
error_header.id = "error-header"
error_header.innerHTML = "Allow camera access"

var error_message = document.createElement("p");
error_message.id = "error-message"
error_message.innerHTML = "We ask you to enable camera access so you can start trying on glasses."

var image = document.createElement("img");
image.style.display = "none";
image.id = "webcam-image";

var hidden_canvas = document.createElement("canvas");

var crop = document.createElement("div");
crop.id = "webcam-crop";

var upper = document.createElement("div");
upper.id = "widget-up"

var glasses_info = document.createElement("div");
glasses_info.id = "glasses-info";

var glasses_name = document.createElement("h3");
glasses_name.id = "glasses-name";

var glasses_image = document.createElement("img");
glasses_image.id = "glasses-image";

var glasses_lenses_link = document.createElement("a");
glasses_lenses_link.id = "glasses-lenses-link"
glasses_lenses_link.href = "#";

var glasses_lenses_button = document.createElement("div");
glasses_lenses_button.id = "glasses-lenses-button";

var glasses_lenses_text = document.createElement("p");
glasses_lenses_text.id = "glasses-lenses-text"
glasses_lenses_text.innerHTML = "Choose Lenses";

var glasses_info_description = document.createElement("h3");
glasses_info_description.id = "glasses-info-description";
glasses_info_description.innerHTML = "Product Description";

var glasses_info_text = document.createElement("p");
glasses_info_text.id = "glasses-info-text";

var glasses_more = document.createElement("div");
glasses_more.id = "glasses-more";

var origw, origh;

function takeSnapshot() {
    var context = hidden_canvas.getContext('2d');

    var width = video.videoWidth,
        height = video.videoHeight;

    if (width && height) {

        hidden_canvas.width = width;
        hidden_canvas.height = height;
        origh = 0.7 * 610;

        context.drawImage(video, 0, 0, width, height);

        return hidden_canvas.toDataURL('image/png');
    }
}
var image_size = 100;
var image_rotation = 0;
var choosen_index = 0;

// When page is loaded
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#virtual-mirror-widget').append(widget);
    $("<div id=\"tooltip\"></div>").appendTo("body")
    widget.append(upper);
    widget.append(controls);
    controls.append(back_contols);
    controls.append(titlestep);
    $("<p><strong>1. </strong> Drag the RED targets to the center of your eyes.</p>").appendTo(controls)
    $("<p><strong>2. </strong> Drag to reposition photo.</p>").appendTo(controls)
    $("<p><strong>3. </strong> Set your PD, if you know it. <span id=\"help-PD\" class=\"material-icons-round\" style=\"font-size: 18px\" data-tooltip=\"If you don't know your PD (Pupillary Distance), leave the default number (62) which is average\">help_outline</span></p>").appendTo(controls)
    controls.append(DP_input);
    $("<p><strong>4. </strong> Adjust the photo with the controls.</p>").appendTo(controls)
    $("<p style=\"font-weight:500\">Photo size:</p>").appendTo(controls);
    controls.append(slider_size);
    slider_size.append(slider_size_handle);
    $("<p style=\"font-weight:500; margin-top:20px\">Photo rotation</p>").appendTo(controls);
    controls.append(slider_rotation);
    slider_rotation.append(slider_rotation_handle);
    var tryon_menu = $("<div></div>", {
        id: "tryon-menu"
    }).append(
        $("<a></a>", {
            id: "tryon-btn-link",
            href: "#"
        }).append(
            $("<div></div>", {
                id: "tryon-btn",
            }).append(
                $("<p>Try On Glasses</p>"), {
                id: "tryon-btn-text",
            }))).appendTo(widget).css({
                display: "none"
            })
    $("<a></a>", {
        id: "reset-link",
        href: "#"
    }).append("<p>Reset Adjastments</p>").appendTo(tryon_menu)

    var Target1 = $("<div></div>", {
        id: "target1",
        class: "target",
    }).draggable().css({
        display: "none",
    }).appendTo(crop)
    var Target2 = $("<div></div>", {
        id: "target2",
        class: "target",
    }).draggable().css({
        display: "none",
    }).appendTo(crop)
    upper.append(crop);
    upper.append(take_photo_btn_link);
    take_photo_btn_link.append(take_photo_btn);
    take_photo_btn.append(take_photo_btn_icon);
    take_photo_btn.append(take_photo_btn_text);
    upper.append(delete_photo_btn_link);
    delete_photo_btn_link.append(delete_photo_btn);
    delete_photo_btn.append(delete_photo_btn_icon);
    delete_photo_btn.append(delete_photo_btn_text);
    crop.append(error_header);
    crop.append(error_message);
    crop.append(image);
    $("<img></img>", {
        id: "example-image",
        src: "example.png"
    }).appendTo(crop);
    upper.append(glasses_info);
    glasses_info.append(glasses_name);
    glasses_info.append(glasses_image);
    glasses_info.append(glasses_lenses_link);
    glasses_lenses_link.append(glasses_lenses_button)
    glasses_lenses_button.append(glasses_lenses_text)
    glasses_info.append(glasses_info_description)
    glasses_info.append(glasses_info_text);
    widget.append(glasses_more);

    $("[data-tooltip]").mousemove(function (eventObject) {
        var data_tooltip = $(this).attr("data-tooltip");
        $("#tooltip").html(data_tooltip)
            .css({
                "top": eventObject.pageY + 5,
                "left": eventObject.pageX + 5
            })
            .show();
    }).mouseout(function () {
        $("#tooltip").hide()
            .html("")
            .css({
                "top": 0,
                "left": 0
            });
    });

    image.src = "";
    image.style.display = "none";
    image.style.left = "";
    image.style.top = "";
    video.style.display = "none";
    
    take_photo_btn_link.style.display = "none";
    controls.style.display = "none"
    glasses_info.style.display = "";
    glasses_more.style.display = "";
    error_message.style.display = "none";
    error_header.style.display = "none";
    delete_photo_btn_link.style.display = "none";
    tryon_menu.css("display", "none");
    Target1.css("display", "none")
    Target2.css("display", "none")

    // Get glasses from server
    var glasses;
    var glasses_frame

    $("<h3></h3>", {
        id: "glasses-more-title-frame",
    }).appendTo(glasses_more).html("Similar Frames");

    fetch('https://optimaxdev.github.io/volga-it/response.json')
        .then(res => res.json())
        .then(data => {
            glasses = data.items;
            glasses_info_text.innerHTML = glasses[choosen_index].description;
            glasses_name.innerHTML = glasses[choosen_index].name;
            glasses_image.src = glasses[choosen_index].image;
            glasses_frame = $("<img></img>", {
                src: glasses[choosen_index].mirror_frame
            }).css({
                display: "none"
            })
            glasses_frame.appendTo(crop)
            var k = 0
            for (var i = 0; i < 5 && k < 3; i++) {
                if (choosen_index == i) continue
                var tempd = document.createElement("div");
                var tempi = document.createElement("img");
                var tempt = document.createElement("p");
                tempd.className = "glasses-more-item";
                $(tempd).attr('ind', i).css("cursor", "pointer");
                $(tempi).attr('ind', i);
                $(tempt).attr('ind', i);
                $(tempd).attr('id', "glasses-more-item" + i);
                $(tempi).attr('id', "glasses-more-image" + i);
                $(tempt).attr('id', "glasses-more-title" + i);
                tempi.src = glasses[i].image;
                tempi.className = "glasses-more-image"
                tempt.className = "glasses-more-title"
                tempt.innerHTML = glasses[i].name;
                $(tempd).click(function (e) {
                    console.log($(e.target).attr("ind"))
                    var old_choosen_index = choosen_index;
                    choosen_index = +$(e.target).attr("ind");
                    $("#glasses-more-item" + choosen_index).attr("ind", old_choosen_index).attr("id", "glasses-more-item" + old_choosen_index)
                    $("#glasses-more-image" + choosen_index).attr("ind", old_choosen_index).attr("src", glasses[old_choosen_index].image).attr("id", "glasses-more-image" + old_choosen_index)
                    $("#glasses-more-title" + choosen_index).attr("ind", old_choosen_index).html(glasses[old_choosen_index].name).attr("id", "glasses-more-title" + old_choosen_index)
                    glasses_info_text.innerHTML = glasses[choosen_index].description;
                    glasses_name.innerHTML = glasses[choosen_index].name;
                    glasses_image.src = glasses[choosen_index].image;
                    glasses_frame.attr("src", glasses[choosen_index].mirror_frame);
                })
                glasses_more.append(tempd);
                tempd.append(tempi);
                tempd.append(tempt);
                k++;

            }
        })
        // find out how many pixels is 1 mm
        const mmtopx = $("<div></div>").css({
            width: "100mm"
        }).appendTo("body")[0].clientWidth / 100;
    $("<a id=\"upload-photo-btn-link\" href=\"#\" style=\"\"><div id=\"upload-photo-btn\"><span id=\"upload-photo-btn-icon\" class=\"material-icons-round\">add_a_photo</span><p id=\"upload-photo-btn-text\">Upload</p></div></a>").appendTo(crop).click(function (e) {
        
        $("#upload-photo-btn-link").css("display", "none");
        $("#example-image").css("display", "none");
        error_message.style.display = "";
        error_header.style.display = "";
        

        // Get permission to camera
        

        navigator.mediaDevices.getUserMedia(
            {
                video: {
                    width: {
                      min: 1280,
                      ideal: 1920,
                      max: 2560,
                    },
                    height: {
                      min: 720,
                      ideal: 1080,
                      max: 1440
                    },
                  }
            }).then(function (stream) {
                crop.append(video);
                video.srcObject = stream;
                

                video.onloadedmetadata = function(e) {
                    video.play();
                };
                
                video.style.display = "flex";
                error_message.style.display = "none";
                error_header.style.display = "none";
                take_photo_btn_link.style.display = "";
                // Intialising sliders
                $("#slider-size").slider({
                    value: 100,
                    range: "min",
                    min: 100,
                    max: 300
                });
                $("#slider-rotation").slider({
                    value: 0,
                    range: "min",
                    max: 180,
                    min: -180
                });

                Go_Back(e);
                
                
                $("#slider-size").on("slide", function (event, ui) {
                    image_size = ui.value;
                    image.width = origw * (image_size / 100);
                    
                    image.style.height = origh * (image_size / 100) + "px";
                    image.style.transform = "translateX(-50%) rotate(" + image_rotation + "deg)";
                }).on("slidechange", function (event, ui) {
                    image_size = ui.value;
                    image.width = origw * (image_size / 100);
                    image.style.height = origh * (image_size / 100) + "px";
                    image.style.transform = "translateX(-50%) rotate(" + image_rotation + "deg)";
                });
                $("#slider-rotation").on("slide", function (event, ui) {
                    image_rotation = ui.value;
                    image.width = origw * (image_size / 100);
                    image.style.height = origh * (image_size / 100) + "px";
                    image.style.transform = "translateX(-50%) rotate(" + image_rotation + "deg)";
                }).on("slidechange", function (event, ui) {
                    image_rotation = ui.value;
                    image.width = origw * (image_size / 100);
                    image.style.height = origh * (image_size / 100) + "px";
                    image.style.transform = "translateX(-50%) rotate(" + image_rotation + "deg)";
                });

            }).catch(function (err) {
                error_header.innerHTML = err.message;
            })
    })
    

    $(take_photo_btn).click(function (e) {

        e.preventDefault();

        var snap = takeSnapshot();
        var w = (image.clientWidth == 0 ? (image.width == 0 ? (video.clientWidth == 0 ? video.getBoundingClientRect().right - video.getBoundingClientRect().left : video.clientWidth) : image.width) : image.clientWidth );
        console.log(image.clientWidth, image.width, video.clientWidth, video.width,video.getBoundingClientRect().right - video.getBoundingClientRect().left)
        image.src = snap;
        image.style.display = "";
        w = (w == 0 ? (image.clientWidth == 0 ? (image.width == 0 ? (video.clientWidth == 0 ? video.getBoundingClientRect().right - video.getBoundingClientRect().left : video.clientWidth) : image.width) : image.clientWidth ) : w);
        console.log(image.clientWidth, image.width, video.clientWidth, video.width,video.getBoundingClientRect().right - video.getBoundingClientRect().left)
        video.style.display = "none";
        error_message.style.display = "none";
        error_header.style.display = "none";
        take_photo_btn_link.style.display = "none";
        controls.style.display = ""
        glasses_info.style.display = "none";
        glasses_more.style.display = "none";
        delete_photo_btn_link.style.display = "";
        tryon_menu.css("display", "flex");
        w = (w == 0 ? (image.clientWidth == 0 ? (image.width == 0 ? (video.clientWidth == 0 ? video.getBoundingClientRect().right - video.getBoundingClientRect().left : video.clientWidth) : image.width) : image.clientWidth ) : w);
        console.log(image.clientWidth, image.width, video.clientWidth, video.width,video.getBoundingClientRect().right - video.getBoundingClientRect().left)
        if (w != 0)
            origw = w;

        Target1.css({
            display: "",
            left: 125 + "px",
            top: 200 + "px"
        })
        Target2.css({
            display: "",
            left: 295 + "px",
            top: 170 + "px"
        })


        $("#webcam-image").draggable();
        // Pause video playback of stream
        video.pause();
    });

    var Go_Back = function (e) {
        e.preventDefault();

        // Hide image
        image.style.display = "none";
        image.style.left = "";
        image.style.top = "";
        video.style.display = "flex";
        error_message.style.display = "none";
        error_header.style.display = "none";
        take_photo_btn_link.style.display = "";
        controls.style.display = "none"
        glasses_info.style.display = "";
        glasses_more.style.display = "";
        delete_photo_btn_link.style.display = "none";
        tryon_menu.css("display", "none");
        Target1.css("display", "none")
        Target2.css("display", "none")
        $("#slider-size").slider("value", 100);
        $("#slider-rotation").slider("value", 0)
        glasses_frame.css("display", "none");

        // Resume playback of stream
        video.play();
    }

    $(delete_photo_btn).click(Go_Back);
    $(back_contols).click(Go_Back);

    $("#reset-link").click(function (e) {
        Target1.css({
            display: "",
            left: 125 + "px",
            top: 200 + "px"
        })
        Target2.css({
            display: "",
            left: 295 + "px",
            top: 170 + "px"
        })
        $("#slider-size").slider("value", 100);
        $("#slider-rotation").slider("value", 0)
        image.style.left = "";
        image.style.top = "";
    })

    $("#tryon-btn-link").click(function (e) {
        tryon_menu.css("display", "none");
        controls.style.display = "none"
        glasses_info.style.display = "";
        glasses_more.style.display = "";
        image.style.transform = "translateX(-50%) rotate(" + 0 + "deg)";
        image.style.top = (image.getBoundingClientRect().y - crop.getBoundingClientRect().y) + "px";
        image.style.transform = "translateX(-50%) rotate(" + image_rotation + "deg)";

        var x1 = Target1[0].getBoundingClientRect().x + 15 - crop.getBoundingClientRect().x,
            y1 = Target1[0].getBoundingClientRect().y + 15 - crop.getBoundingClientRect().y,
            x2 = Target2[0].getBoundingClientRect().x + 15 - crop.getBoundingClientRect().x,
            y2 = Target2[0].getBoundingClientRect().y + 15 - crop.getBoundingClientRect().y;
        var rot = (y2 - y1) / (x2 - x1);
        var distOr = DP_input.value * mmtopx;
        var distReal = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        var widthOr = glasses[choosen_index].width * mmtopx;

        var widthReal = glasses_frame[0].naturalWidth;
        var heightReal = glasses_frame[0].naturalHeight;
        var coef = (widthOr / widthReal) / (distOr / distReal);
        var xs = (x1 + x2) / 2, ys = (y1 + y2) / 2;
        glasses_frame.css({
            transform: "rotate(" + Math.atan(rot) + "rad)",
            position: "relative",
            display: "",
            "z-index": 100,
            left: xs - widthReal * coef / 2,
            top: ys - heightReal * coef / 2 - image.clientHeight,

        }).attr("width", widthReal * coef)
        Target1.css("display", "none")
        Target2.css("display", "none")
    })


});