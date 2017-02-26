/**
 * Dynamic creation of Modal
 * @param element. element should be a jquery object, "heading" and "content" attribute has to be attached in data params whose key is "value". The attributes can be a string on html elements.
 */
function onModalClick(element) {
    var jelement = $(element);
    var heading = jelement.data("value").heading;
    var formContent = jelement.data("value").content;

    html =  '<div id="dynamicModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<button class="close" data-dismiss="modal">&times;</button>';
    html += '<h2>'+heading+'</h2>';
    html += '</div>';
    if (formContent !== ""){
        html += '<div class="modal-body">';
        html += '<p>';
        html += formContent;
        html += '</div>';
    }
    html += '<div class="modal-footer">';
    html += '<span class="btn btn-primary" data-dismiss="modal">Close</span>';
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // footer
    html += '</div>';  // modalWindow
    $('body').append(html);
    var $dynamicModal = $('#dynamicModal');
    $dynamicModal.modal();
    $dynamicModal.modal('show');

    $dynamicModal.on('hidden.bs.modal', function (e) {
        $(this).remove();
    });

}

/**
 * Education loader helper
 * @param edu. Object.
 */
function loadEducation(edu){
    var $container = $("#education").children(".container").eq(0);
    for (var i=0; i<edu.length; ++i){
        var data = edu[i];
        var $row = $("<div>", {class: "row education-content"});
        $row.data("value", data.info);
        $row.click(function() {
            onModalClick(this);
        });

        var $more_info = $("<div>", {class: "col-md-2 more-info"});
        var $more_info_content = $("<span>", {class: "glyphicon glyphicon-info-sign"});

        $more_info.append($more_info_content);
        $more_info.append("<p>Click me!</p>");
        $row.append($more_info);

        var $left_info = $("<div>", {class: "col-md-5"});
        $left_info.append("<p class='university-name'><span class='glyphicon glyphicon-education'></span> " + data.university_name + "</p>");
        $left_info.append("<p class='university-specialization'><span class='glyphicon glyphicon-question-sign'></span> " + data.degree + "</p>");
        var $right_info = $("<div>", {class: "col-md-5"});
        $right_info.append("<p class='batch'><span class='glyphicon glyphicon-comment'></span> " + data.batch + "</p>");
        $right_info.append("<p class='gpa'><span class='glyphicon glyphicon-leaf'></span> " + data.gpa + "</p>");

        $row.append($left_info);
        $row.append($right_info);

        $container.append($row);
    }

}

/**
 * Helper method to generate li tags with anchor tags
 * @param link href value
 * @param text li innerhtml
 * @returns {string} an element with li tag
 */
function linkGen(link, text){
    return "<li class='list-group-item'><a href=" + link + " target='_blank'>" + text + "</a></li>";
}

function projectDataToModalData(project){
    var heading = project.name;
    var content = project.about.description;
    var links = project.about.links;

    var li_s = "";
    if (links.source_code !== ""){
        li_s += linkGen(links.source_code, "For Source Code, click me!");
    }
    if (links.project_page !== ""){
        li_s +=linkGen(links.project_page, "For Project page, click me!");
    }
    if (links.project_demo_page !== ""){
        li_s += "<li>" + linkGen(links.project_demo_page, "For Project Demo Page code. click me!");
    }
    if (links.project_demo_youtube !== ""){
        li_s += linkGen(links.project_demo_youtube, "For Video demo, click me!");
    }

    if (li_s !== ""){
        content += "<ul class='list-group'>" + li_s +"</ul>";
    }

    return {heading: heading, content: content}

}

/**
 * Project loader helper
 * @param projects Object
 */
function loadProjects(projects){
    var $container = $("#projects").children(".container").eq(0);
    if (projects.length > 0){
        $container.append("<p>Click on the individual project boxes for more information.</p>");
    }
    var $row = "";
    var counter = 0;
    for (var i=0; i<projects.length; ++i){
        if (counter%4 == 0){
            $row = $("<div>", {class: "row"});
            $container.append($row);
        }
        counter ++;
        var project = projects[i];
        var $main = $("<div>", {class: "col-xs-6 col-md-3"});
        var $project = $("<div>", {class: "project"});
        $project.data("value", projectDataToModalData(project));
        $project.click(function(){
            onModalClick(this);
        });
        $project.append("<h3>" + project.name + "</h3>");
        $project.append("<p>" + project.about.snippet + "</p>");

        $main.append($project);

        $row.append($main);
    }

    $(".project").each(function () {
        $(this).height($(this).width()*.7);
    });
}

/**
 * A helper method to convert each work experience object and convert it to ModalData compatible format
 * @param work Object
 * @returns {{heading: (*|Number), content: (string|*|string)}}
 */
function workExpToModalData(work){
    var heading = work.description.heading;
    var content = work.description.content;

    var responsibility = work.description.responsibilities;
    if (responsibility.length != 0){

        var responsility_lis = responsibility.map(function(responsibility){
            return ["<li class='list-group-item'>" + responsibility + "</li>"];
        }).reduce(function(a, b){
            return a + b;
        });
        if (responsility_lis){
            content += "<ul class='list-group'>" + responsility_lis + "</ul>";
        }
    }
    return {heading: heading, content: content};
}

/**
 * Work Experience loader helper
 * @param works
 */
function loadWorkExp(works){
    var $container = $("#work-experience").children(".container").eq(0);
    if (works.length > 0){
        $container.append("<p>Click on the individual boxes for more information.</p>");
    }
    for (var i=0; i<works.length; ++i){
        var work = works[i];
        var $row = $("<div>", {class: "row work-experience-element"});
        $row.data("value", workExpToModalData(work));
        $row.click(function() {
            onModalClick(this);
        });

        var $work_1 = $("<div>", {class: "col-md-4"});
        $work_1.append("<h4>" + work.company +"</h4>");

        var $work_2 = $("<div>", {class: "col-md-4"});
        $work_2.append("<h4>" + work.position +"</h4>");

        var $work_3 = $("<div>", {class: "col-md-4"});
        $work_3.append("<p>" + work.location +"</p>" + "<p>" + work.period +"</p>");

        $row.append($work_1).append($work_2).append($work_3);
        $container.append($row);
    }
}

/**
 * Helper method to load skills
 * @param skills
 */
function loadSkill(skills){
    var data_list = [];
    for (var v in skills){
        data_list.push([v, skills[v]]);
    }
    data_list.sort(function(a, b){
        return b[1] - a[1];
    });

    li_s = "";
    for (var i=0; i<data_list.length; ++i){
        li_s += "<li class='list-group-item '>" + data_list[i][0] + "</li>";
    }
    var content = "";
    if (li_s !== ""){
        content += "<ul  class='list-group'>" + li_s + "</ul>";
    }
    var $container = $("#skills").children(".container").eq(0);
    $container.append(content);
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// Future work on contact forms, once a backend api is configured.
// function onContactFormSubmit(e){
//     e.preventDefault();
//     var name = $("#contact_form_name").val();
//     var email = $("#contact_form_email").val();
//     var message = $("#contact_form_message").val();
//
//     var $cfng = $('#contact_form_name_group');
//     var $cfeg = $('#contact_form_email_group');
//     var $cfmg = $('#contact_form_message_group');
//
//     if (name.length < 3 ){
//         $cfng.addClass("has-error");
//         $cfng.children('span').eq(0).html("Enter a valid name");
//         console.log("exiting early, name error");
//         return;
//     }else{
//         $cfng.removeClass("has-error");
//         $cfng.children('span').eq(0).html("");
//     }
//
//     if (isEmail(email) ){
//         $cfeg.removeClass("has-error");
//         $cfeg.children('span').eq(0).html("");
//     }else{
//         $cfeg.addClass("has-error");
//         $cfeg.children('span').eq(0).html("Enter a valid email!");
//         console.log("exiting early, email error");
//         return;
//     }
//
//     if (message.length < 6 ){
//         $cfmg.addClass("has-error");
//         $cfmg.children('span').eq(0).html("Message length is too short!");
//         console.log("exiting early, message error");
//         return;
//     }else{
//         $cfmg.removeClass("has-error");
//         $cfmg.children('span').eq(0).html("");
//     }
//
//     var contact_details = $("#contact").data("contact");
//     if (!contact_details || !contact_details.email || contact_details.email === ""){
//         alert("Contact details for this profile not found!");
//         return;
//     }
//     var dt = {
//             "from": email,
//             "to": contact_details.email,
//             "subject": "From my domain",
//             "text": message
//         };
//     console.log(dt);
//
    //     $.ajax({
//         type: "POST",
//         url: "https://api.mailgun.net/v3/sandbox8435e3f56ba7482a91bf874b0984ea83.mailgun.org/messages",
//         data : {
//             "from": email,
//             "to": contact_details.email,
//             "subject": "From my domain",
//             "text": message
//         },
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader('api', "key");
//         }
//     }).done(function() {
//         $("#contact_form_name").val("");
//         $("#contact_form_email").val("");
//         $("#contact_form_message").val("");
//         alert( "Message Sent successfully!!! :-)" );
//     })
//         .fail(function(e) {
//             console.log(e);
//             alert( "Message not Sent. Internal Error!!!" );
//         });
// }

/**
 * Helper method to attach contact details to #contact element
 * @param contact
 */
function attachContactData(contact){
    $("#contact").data("contact", contact);
}

/**
 * Helper method to load contact details
 * @param contact
 */
function loadContactDetails(contact){
// <i class="fa fa-facebook-square" aria-hidden="true"></i>
    var $container = $("#contact").children(".container").eq(0);
    $container.append("<p>" + contact.description +"</p>");
    $contact = $("#contact");
    $contact.data("value", {heading: contact.phone_number, content: ""});
    var li_s = "";
    if (contact.linkedIn){
        li_s += "<li class='list-group-item'><a target='_blank' href = " + contact.linkedIn +" title=" + contact.linkedIn +"><i class='fa fa-linkedin-square fa-4x' aria-hidden='true'></i></a>" +"</li>";
    }
    if (contact.github){
        li_s += "<li class='list-group-item'><a target='_blank' href = " + contact.github +" title=" + contact.github +"><i class='fa fa-github fa-4x' aria-hidden='true'></i></a>" +"</li>";
    }
    if (contact.email){
        li_s += "<li class='list-group-item'><a target='_blank' href =mailto:" + contact.email +"?Subject=Hello%20Bharath title=" + contact.email + "><i class='fa fa-envelope fa-4x' aria-hidden='true'></i></a>" +"</li>";
    }
    if (contact.facebook){
        li_s += "<li class='list-group-item'><a target='_blank' href=" + contact.facebook + " title=" + contact.facebook + "><i class='fa fa-facebook-square fa-4x' aria-hidden='true'></i></a>" +"</li>";
    }
    if (contact.phone_number){

        li_s += "<li id='phone_logo' class='list-group-item'><a " +  contact.phone_number + " title=" + contact.phone_number +"><i class='fa fa-phone fa-4x' aria-hidden='true'></i></a>";
    }

    if (li_s != ""){
        $container.append("<ul class='list-group'>" + li_s +"</ul>");
    }
    $("#phone_logo").click( function(){
            onModalClick($contact);
    });

}

/**
 * Helper method to load resume
 * @param resume
 */
function loadResume(resume){
    var $container = $("#resume").children(".container").eq(0);
    $container.append("<p>" + resume.description + "</p>");
    $container.append("<a target='_blank' href=" + resume.file + " >Download here</a>");
}

/**
 * Main method to render complete data
 */
function loadData(){
    $.getJSON("res/data.json")
        .done(function(data) {
            loadEducation(data.education);
            loadProjects(data.projects);
            loadWorkExp(data.work_experience);
            loadSkill(data.skills);
            attachContactData(data.contact);
            loadContactDetails(data.contact);
            loadResume(data.resume);
        })
        .fail(function(e) {
            console.log( "invalid json" );
        });
}

loadData();

// smooth scroll
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});


// bootstrap navbar fixup which balance the body height issue
// http://stackoverflow.com/questions/11124777/twitter-bootstrap-navbar-fixed-top-overlapping-site
$('body').css("padding-top", $('.navbar').height());

//collapse on select
$(function() {
    $('.navbar-nav a').on('click', function(){
        if($('.navbar-header .navbar-toggle').css('display') !='none'){
            $(".navbar-header .navbar-toggle").trigger( "click" );
        }
    });
});