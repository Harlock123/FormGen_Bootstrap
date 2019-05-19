"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormGenBS = /** @class */ (function () {
    function FormGenBS(DomElementID, UIElements, VersionString, JSobjectName) {
        this.theUIInteractions = [];
        this.theVersionString = "";
        this.JSOBJECTNAME = "";
        // set the form version here
        this.theVersionString = VersionString;
        // DomElementID will be the container for all the inserted form content
        // save the containerID for further use elsewhere
        this.theContainer = DomElementID;
        // save the name the particular instance is called for event wireup 
        this.JSOBJECTNAME = JSobjectName;
        this.HydrateForm(UIElements);
        this.DOINTERACTION = function (e) { this.DoFormGenInteraction(e); };
    }
    FormGenBS.prototype.HydrateForm = function (UIElements) {
        // save the handed in UIElements for further processing later
        this.theUIElements = UIElements;
        // here we will preparse the UIElements to determine the formgrouping 
        // for the purposes of selecting the appropriate columnar layout characteristics
        // to employ for each form row
        var FROWS = [];
        var BOOTSTRAPTAGS = [];
        var FROWTAGS = [];
        var row = 0;
        var cnt = 0;
        var eventwirup = this.JSOBJECTNAME + ".DOINTERACTION(this)";
        for (var _i = 0, UIElements_1 = UIElements; _i < UIElements_1.length; _i++) {
            var THEEL = UIElements_1[_i];
            if (THEEL.elFormRow != row) {
                // we have a new row lets push the old row
                FROWS.push(cnt);
                cnt = 1;
                row = THEEL.elFormRow;
            }
            else {
                cnt += 1;
            }
        }
        FROWS.push(cnt);
        for (var i = FROWS.length; i < UIElements.length; i++) {
            FROWS.push(cnt);
            FROWS.push(cnt);
            FROWS.push(cnt);
            FROWS.push(cnt);
            FROWS.push(cnt);
        }
        cnt = 0;
        for (var i = FROWS.length; i < UIElements.length; i++) {
            FROWS.push(cnt);
            FROWS.push(cnt);
            FROWS.push(cnt);
            FROWS.push(cnt);
        }
        // we now have an array of numbers the ordinal position in that array has the number of
        // elements that are in that forms row as defined by the UIElements array handed in
        // Starting from 1 (The Zero element in the array should have 0 in it so its 1 based)
        // assuming that the numbered rows handed in started at 1...
        // now lets iterate over the list of FORM ROWS and determine the BOOTSTRAP Tags to employ on each of those rows
        for (var _a = 0, FROWS_1 = FROWS; _a < FROWS_1.length; _a++) {
            var RRR = FROWS_1[_a];
            if (RRR != 0) {
                switch (RRR) {
                    case 1: {
                        BOOTSTRAPTAGS.push("col-md-12");
                        for (var _b = 0, UIElements_2 = UIElements; _b < UIElements_2.length; _b++) {
                            var THEEL = UIElements_2[_b];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 2: {
                        BOOTSTRAPTAGS.push("col-md-6");
                        for (var _c = 0, UIElements_3 = UIElements; _c < UIElements_3.length; _c++) {
                            var THEEL = UIElements_3[_c];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 3: {
                        BOOTSTRAPTAGS.push("col-md-4");
                        for (var _d = 0, UIElements_4 = UIElements; _d < UIElements_4.length; _d++) {
                            var THEEL = UIElements_4[_d];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 4: {
                        BOOTSTRAPTAGS.push("col-md-3");
                        for (var _e = 0, UIElements_5 = UIElements; _e < UIElements_5.length; _e++) {
                            var THEEL = UIElements_5[_e];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 6: {
                        BOOTSTRAPTAGS.push("col-md-2");
                        for (var _f = 0, UIElements_6 = UIElements; _f < UIElements_6.length; _f++) {
                            var THEEL = UIElements_6[_f];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 12: {
                        BOOTSTRAPTAGS.push("col-md-1");
                        for (var _g = 0, UIElements_7 = UIElements; _g < UIElements_7.length; _g++) {
                            var THEEL = UIElements_7[_g];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    default: {
                        BOOTSTRAPTAGS.push("col-md-1");
                        for (var _h = 0, UIElements_8 = UIElements; _h < UIElements_8.length; _h++) {
                            var THEEL = UIElements_8[_h];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            cnt += 1;
        }
        // Our BOOTSTRAPTAGS array now has the element for each row in the resulting form
        // get the actual html element where we will put all this stuff
        var el = document.getElementById(this.theContainer);
        var innerhtml = '<div class="card-body"><form> ';
        var CURROW = 0;
        for (var _j = 0, BOOTSTRAPTAGS_1 = BOOTSTRAPTAGS; _j < BOOTSTRAPTAGS_1.length; _j++) {
            var CBTAG = BOOTSTRAPTAGS_1[_j];
            CURROW += 1;
            innerhtml += '<div class="form-row" style="' + FROWTAGS[CURROW - 1] + '" >';
            for (var _k = 0, UIElements_9 = UIElements; _k < UIElements_9.length; _k++) {
                var THEEL = UIElements_9[_k];
                if (THEEL.elFormRow == CURROW) { // We have an element that is going into the curent row
                    switch (THEEL.elType.toUpperCase()) {
                        case "TEXT": {
                            // here we decode the elFormStyle element if its present
                            var STY = "";
                            var CC = "form-control input-md"; // for TEXT inputs
                            if (THEEL.elCustomClass != "" && THEEL.elCustomClass != undefined) {
                                CC = THEEL.elCustomClass;
                            }
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            if (THEEL.elRequired) {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td valign="top" class="text-red"> * </td>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            else {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                innerhtml += '<input type="text" class="' + CC + '" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" style="' + THEEL.elFormStyle + '"  > ';
                            }
                            else {
                                for (var _l = 0, _m = THEEL.elInteractions; _l < _m.length; _l++) {
                                    var v = _m[_l];
                                    this.theUIInteractions.push(v);
                                }
                                innerhtml += '<input type="text" class="' + CC + '" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" > ';
                            }
                            innerhtml += '</div></div> ';
                            break;
                        }
                        case "DATE": {
                            // here we decode the elFormStyle element if its present
                            var STY = "";
                            var CC = "form-control input-md"; // for TEXT inputs
                            if (THEEL.elCustomClass != "" && THEEL.elCustomClass != undefined) {
                                CC = THEEL.elCustomClass;
                            }
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            if (THEEL.elRequired) {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td valign="top" class="text-red"> * </td>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            else {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                innerhtml += '<input type="date" class="' + CC + '" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" style="' + THEEL.elFormStyle + '" > ';
                            }
                            else {
                                for (var _o = 0, _p = THEEL.elInteractions; _o < _p.length; _o++) {
                                    var v = _p[_o];
                                    this.theUIInteractions.push(v);
                                }
                                innerhtml += '<input type="date" class="' + CC + '" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" > ';
                            }
                            innerhtml += '</div></div> ';
                            break;
                        }
                        case "NARRATIVE": {
                            // here we decode the elFormStyle element if its present
                            var STY = "";
                            var CC = "form-control input-md"; // for TEXT inputs
                            if (THEEL.elCustomClass != "" && THEEL.elCustomClass != undefined) {
                                CC = THEEL.elCustomClass;
                            }
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            if (THEEL.elRequired) {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td valign="top" class="text-red"> * </td>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            else {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                innerhtml += '<textarea rows="5" cols="40" class="' + CC + '" name="' + THEEL.elID + '" id="'
                                    + THEEL.elID + '" style="' + THEEL.elFormStyle + '" ></textarea> ';
                            }
                            else {
                                for (var _q = 0, _r = THEEL.elInteractions; _q < _r.length; _q++) {
                                    var v = _r[_q];
                                    this.theUIInteractions.push(v);
                                }
                                innerhtml += '<textarea rows="5" cols="40" class="' + CC + '" name="' + THEEL.elID + '" id="'
                                    + THEEL.elID + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" ></textarea> ';
                            }
                            innerhtml += '</div></div> ';
                            break;
                        }
                        case "RADIO": {
                            // here we decode the elFormStyle element if its present
                            var STY = "";
                            var CC = "custom-control-input";
                            if (THEEL.elCustomClass != "" && THEEL.elCustomClass != undefined) {
                                CC = THEEL.elCustomClass;
                            }
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            if (THEEL.elRequired) {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td valign="top" class="text-red"> * </td>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '"  >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            else {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '"  >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            var i = 0;
                            for (var _s = 0, _t = THEEL.elContent; _s < _t.length; _s++) {
                                var v = _t[_s];
                                i += 1;
                                innerhtml += '<div class="custom-control custom-radio custom-control-inline">';
                                if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                    innerhtml += '<input type="radio" class="' + CC + '" ' +
                                        'name = "' + THEEL.elID + '" id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" style="' + THEEL.elFormStyle + '" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v + '</label>';
                                }
                                else {
                                    for (var _u = 0, _v = THEEL.elInteractions; _u < _v.length; _u++) {
                                        var v_1 = _v[_u];
                                        this.theUIInteractions.push(v_1);
                                    }
                                    innerhtml += '<input type="radio" class="' + CC + '" ' +
                                        'name = "' + THEEL.elID + '" id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v + '</label>';
                                }
                                innerhtml += "</div>";
                            }
                            innerhtml += '</div></div> ';
                            break;
                        }
                        case "DROPDOWN": {
                            // here we decode the elFormStyle element if its present
                            var STY = "";
                            var CC = "form-control input-md"; // for TEXT inputs
                            if (THEEL.elCustomClass != "" && THEEL.elCustomClass != undefined) {
                                CC = THEEL.elCustomClass;
                            }
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            if (THEEL.elRequired) {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td valign="top" class="text-red"> * </td>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            else {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                innerhtml += '<select name="' + THEEL.elID + '" class="' + CC + '"  id="' +
                                    THEEL.elID + '" style="' + THEEL.elFormStyle + '" >';
                            }
                            else {
                                for (var _w = 0, _x = THEEL.elInteractions; _w < _x.length; _w++) {
                                    var v = _x[_w];
                                    this.theUIInteractions.push(v);
                                }
                                innerhtml += '<select name="' + THEEL.elID +
                                    '" class="' + CC + '" id="' + THEEL.elID +
                                    '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" >';
                            }
                            // Lets put the Watermark in here
                            innerhtml += '<option value="" disabled selected hidden>Please Select </option>';
                            var i = 0;
                            for (var _y = 0, _z = THEEL.elContent; _y < _z.length; _y++) {
                                var v = _z[_y];
                                i += 1;
                                innerhtml += '<option ' +
                                    'name = "' + THEEL.elID + '" id="' +
                                    THEEL.elID + '_' + i.toString() + '" ' +
                                    'value="' + v + '" >' + v + '</option> ';
                            }
                            innerhtml += '</select>';
                            innerhtml += '</div></div> ';
                            break;
                        }
                        case "CHECKBOX": {
                            // here we decode the elFormStyle element if its present
                            var STY = "";
                            var CC = "custom-control-input";
                            if (THEEL.elCustomClass != "" && THEEL.elCustomClass != undefined) {
                                CC = THEEL.elCustomClass;
                            }
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            if (THEEL.elRequired) {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td valign="top" class="text-red"> * </td>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            else {
                                innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                                innerhtml += '<table>';
                                innerhtml += '<td>';
                                innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                                innerhtml += THEEL.elLabel;
                                innerhtml += '</label>';
                                innerhtml += '</td>';
                                innerhtml += '</table>';
                            }
                            var i = 0;
                            for (var _0 = 0, _1 = THEEL.elContent; _0 < _1.length; _0++) {
                                var v = _1[_0];
                                i += 1;
                                innerhtml += '<div class="custom-control custom-checkbox custom-control-inline">';
                                if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                    innerhtml += '<input type="checkbox" ' +
                                        'name = "' + THEEL.elID + '" class="' + CC + '"  id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" style="' + THEEL.elFormStyle + '" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label"  >' + v + '</label>';
                                }
                                else {
                                    for (var _2 = 0, _3 = THEEL.elInteractions; _2 < _3.length; _2++) {
                                        var v_2 = _3[_2];
                                        this.theUIInteractions.push(v_2);
                                    }
                                    innerhtml += '<input type="checkbox" ' +
                                        'name = "' + THEEL.elID + '" class="' + CC + '"  id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v + '</label>';
                                }
                                innerhtml += "</div>";
                            }
                            innerhtml += '</div></div> ';
                            break;
                        }
                        case "INFOTEXT": {
                            var STY = "";
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="div_' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label> ';
                            if (THEEL.elContent.length != 0) {
                                // we have some items for an actual list
                                innerhtml += '<ul style="' + THEEL.elFormStyle + '">';
                                for (var _4 = 0, _5 = THEEL.elContent; _4 < _5.length; _4++) {
                                    var v = _5[_4];
                                    innerhtml += '<li>' + v + '</li>';
                                }
                                innerhtml += '</ul>';
                            }
                            innerhtml += '</div></div> ';
                            break;
                        }
                        case "HEADER": {
                            var STY = "";
                            if (THEEL.elStyle != "") {
                                STY = ' style="text-align:center;vertical-align:middle;margin-bottom:0; ' + THEEL.elStyle + '" ';
                            }
                            else {
                                STY = ' style="text-align:center;vertical-align:middle;margin-bottom:0" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="div_' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label>';
                            innerhtml += '</div></div> ';
                            break;
                        }
                        case "FOOTER": {
                            var STY = "";
                            if (THEEL.elStyle != "") {
                                STY = ' style="text-align:center;vertical-align:middle;margin-bottom:0; ' + THEEL.elStyle + '" ';
                            }
                            else {
                                STY = ' style="text-align:centervertical-align:middle;margin-bottom:0" ';
                            }
                            var VIS = ""; //'style="display:block"';
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            if (THEEL.elAutoSize) {
                                innerhtml += '<div class="col-auto" >';
                            }
                            else {
                                innerhtml += '<div class="' + CBTAG + '" >';
                            }
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="div_' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label>';
                            innerhtml += '</div></div> ';
                            break;
                        }
                    }
                }
            } // end of for (let THEEL of UIElements) 
            // close off the '<div class="form-row" >'
            innerhtml += '</div>';
        }
        innerhtml += "</form></div>";
        el.innerHTML = innerhtml;
        // Ok now all of the elements should be in the DOM
        // now we want to iterate over everything again to set any scoring and any required bits
        for (var _6 = 0, UIElements_10 = UIElements; _6 < UIElements_10.length; _6++) {
            var THEEL = UIElements_10[_6];
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT": {
                    var el = (document.getElementById(THEEL.elID));
                    if (typeof THEEL.elScore[0] == 'undefined' && el != null && el.dataset["fgscore"] !== undefined) {
                        el.dataset.fgscore = "0";
                    }
                    else if (el != null && el.dataset["fgscore"] !== undefined) {
                        el.dataset.fgscore = THEEL.elScore[0].toString();
                    }
                    if (THEEL.elRequired && el != null) {
                        el.dataset.fgrequired = "YES";
                    }
                    else if (el != null) {
                        el.dataset.fgrequired = "NO";
                    }
                    break;
                }
                case "DATE": {
                    var el = (document.getElementById(THEEL.elID));
                    if (typeof THEEL.elScore[0] == 'undefined') {
                        el.dataset.fgscore = "0";
                    }
                    else {
                        el.dataset.fgscore = THEEL.elScore[0].toString();
                    }
                    //el.dataset.fgscore = THEEL.elScore[0].toString();
                    if (THEEL.elRequired) {
                        el.dataset.fgrequired = "YES";
                    }
                    else {
                        el.dataset.fgrequired = "NO";
                    }
                    break;
                }
                case "NARRATIVE": {
                    var el = (document.getElementById(THEEL.elID));
                    if (typeof THEEL.elScore[0] == 'undefined') {
                        el.dataset.fgscore = "0";
                    }
                    else {
                        el.dataset.fgscore = THEEL.elScore[0].toString();
                    }
                    //el.dataset.fgscore = THEEL.elScore[0].toString();
                    if (THEEL.elRequired) {
                        el.dataset.fgrequired = "YES";
                    }
                    else {
                        el.dataset.fgrequired = "NO";
                    }
                    break;
                }
                case "RADIO": {
                    var i = 0;
                    for (var _7 = 0, _8 = THEEL.elScore; _7 < _8.length; _7++) {
                        var v = _8[_7];
                        i += 1;
                        var el = (document.getElementById(THEEL.elID + '_' + i.toString()));
                        if (el != null) {
                            el.dataset.fgscore = v.toString();
                        }
                        if (THEEL.elRequired && el != null) {
                            el.dataset.fgrequired = "YES";
                        }
                        else if (el != null) {
                            el.dataset.fgrequired = "NO";
                        }
                    }
                    break;
                }
                case "DROPDOWN": {
                    var i = 0;
                    for (var _9 = 0, _10 = THEEL.elScore; _9 < _10.length; _9++) {
                        var v = _10[_9];
                        i += 1;
                        var ell = (document.getElementById(THEEL.elID + '_' + i.toString()));
                        ell.dataset.fgscore = v.toString();
                        if (THEEL.elRequired) {
                            ell.dataset.fgrequired = "YES";
                        }
                        else {
                            ell.dataset.fgrequired = "NO";
                        }
                    }
                    break;
                }
                case "CHECKBOX": {
                    var i = 0;
                    for (var _11 = 0, _12 = THEEL.elScore; _11 < _12.length; _11++) {
                        var v = _12[_11];
                        i += 1;
                        var el = (document.getElementById(THEEL.elID + '_' + i.toString()));
                        el.dataset.fgscore = v.toString();
                        if (THEEL.elRequired) {
                            el.dataset.fgrequired = "YES";
                        }
                        else {
                            el.dataset.fgrequired = "NO";
                        }
                    }
                    break;
                }
            }
        }
    };
    /**
     * GetFormData
     */
    FormGenBS.prototype.GetFormData = function () {
        var UIValues = [];
        // first we want to echo the version as one of the elements
        var theversion = new UIValue("FORMVERSIONSTRING", this.theVersionString + "");
        UIValues.push(theversion);
        for (var _i = 0, _a = this.theUIElements; _i < _a.length; _i++) {
            var THEEL = _a[_i];
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        var v = new UIValue(THEEL.elID, el.value);
                        UIValues.push(v);
                        break;
                    }
                case "DATE":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        var v = new UIValue(THEEL.elID, el.value);
                        UIValues.push(v);
                        break;
                    }
                case "NARRATIVE":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        var tv = el.value;
                        //tv.replace('\\','\\\\'); // Excape NewLines and other control characters
                        var v = new UIValue(THEEL.elID, tv);
                        UIValues.push(v);
                        break;
                    }
                case "RADIO":
                    {
                        var i = 0;
                        for (var _b = 0, _c = THEEL.elContent; _b < _c.length; _b++) {
                            var vv = _c[_b];
                            i += 1;
                            var theid = THEEL.elID + "_" + i.toString();
                            var el = (document.getElementById(theid));
                            if (el.checked) {
                                var v = new UIValue(THEEL.elID + "_" + i.toString(), "true");
                                UIValues.push(v);
                            }
                            else {
                                var v = new UIValue(THEEL.elID + "_" + i.toString(), "false");
                                UIValues.push(v);
                            }
                        }
                        break;
                    }
                case "DROPDOWN":
                    {
                        var eli = (document.getElementById(THEEL.elID));
                        var v = new UIValue(THEEL.elID, eli.options[eli.selectedIndex].text);
                        UIValues.push(v);
                        break;
                    }
                case "CHECKBOX":
                    {
                        var i = 0;
                        for (var _d = 0, _e = THEEL.elContent; _d < _e.length; _d++) {
                            var vv = _e[_d];
                            i += 1;
                            var theid = THEEL.elID + "_" + i.toString();
                            var el = (document.getElementById(theid));
                            if (el.checked) {
                                var v = new UIValue(THEEL.elID + "_" + i.toString(), "true");
                                UIValues.push(v);
                            }
                            else {
                                var v = new UIValue(THEEL.elID + "_" + i.toString(), "false");
                                UIValues.push(v);
                            }
                        }
                        break;
                    }
            }
        }
        return UIValues;
    };
    /**
     * GetFormDataAsString
     */
    FormGenBS.prototype.GetFormDataAsString = function () {
        return JSON.stringify(this.GetFormData());
    };
    FormGenBS.prototype.GetFormDefinition = function () {
        return this.theUIElements;
    };
    FormGenBS.prototype.GetFormDefinitionAsString = function () {
        return JSON.stringify(this.GetFormDefinition());
    };
    FormGenBS.prototype.SetFormDefinition = function (TheFormDefinitionAsString) {
        var Self = this;
        Self.HydrateForm(JSON.parse(TheFormDefinitionAsString));
    };
    FormGenBS.prototype.SetFormDefinitionFromObject = function (UIElementArray) {
        var Self = this;
        Self.HydrateForm(UIElementArray);
    };
    /**
     * GetFormDefinitionFrom
     * webUrl: string
    */
    FormGenBS.prototype.GetFormDefinitionFrom = function (webUrl) {
        // Will attempt to populate the for by doung an HTTP GET from the webUrl
        var Self = this;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                Self.HydrateForm(JSON.parse(this.responseText));
            }
        };
        xmlhttp.open('GET', webUrl);
        xmlhttp.send();
    };
    /**
     * SetFormData
     *  UIValues: UIValue[]
     */
    FormGenBS.prototype.SetFormData = function (UIValues) {
        // look for the  version string first and set it
        for (var _i = 0, UIValues_1 = UIValues; _i < UIValues_1.length; _i++) {
            var uivs = UIValues_1[_i];
            if (uivs.uivID.toLocaleUpperCase() == "FORMVERSIONSTRING") {
                this.theVersionString = uivs.uivValue;
                break;
            }
        }
        for (var _a = 0, _b = this.theUIElements; _a < _b.length; _a++) {
            var THEEL = _b[_a];
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        for (var _c = 0, UIValues_2 = UIValues; _c < UIValues_2.length; _c++) {
                            var theval = UIValues_2[_c];
                            if (theval.uivID == THEEL.elID) {
                                el.value = theval.uivValue;
                                this.DoFormGenInteraction(el);
                                break;
                            }
                        }
                        break;
                    }
                case "DATE":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        for (var _d = 0, UIValues_3 = UIValues; _d < UIValues_3.length; _d++) {
                            var theval = UIValues_3[_d];
                            if (theval.uivID == THEEL.elID) {
                                el.value = theval.uivValue;
                                this.DoFormGenInteraction(el);
                                break;
                            }
                        }
                        break;
                    }
                case "NARRATIVE":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        for (var _e = 0, UIValues_4 = UIValues; _e < UIValues_4.length; _e++) {
                            var theval = UIValues_4[_e];
                            if (theval.uivID == THEEL.elID) {
                                el.value = theval.uivValue;
                                this.DoFormGenInteraction(el);
                                break;
                            }
                        }
                        break;
                    }
                case "RADIO":
                    {
                        var i = 0;
                        for (var _f = 0, _g = THEEL.elContent; _f < _g.length; _f++) {
                            var vv = _g[_f];
                            i += 1;
                            var el = (document.getElementById(THEEL.elID + "_" + i.toString()));
                            for (var _h = 0, UIValues_5 = UIValues; _h < UIValues_5.length; _h++) {
                                var theval = UIValues_5[_h];
                                if (theval.uivID == el.id) {
                                    if (theval.uivValue.toUpperCase() == "TRUE") {
                                        el.checked = true;
                                    }
                                    else {
                                        el.checked = false;
                                    }
                                    this.DoFormGenInteraction(el);
                                    break;
                                }
                            }
                        }
                        break;
                    }
                case "DROPDOWN":
                    {
                        var ell = (document.getElementById(THEEL.elID));
                        for (var _j = 0, UIValues_6 = UIValues; _j < UIValues_6.length; _j++) {
                            var theval = UIValues_6[_j];
                            if (theval.uivID == THEEL.elID) {
                                var i = 0;
                                for (var _k = 0, _l = THEEL.elContent; _k < _l.length; _k++) {
                                    var vv = _l[_k];
                                    if (theval.uivValue == vv) {
                                        ell.selectedIndex = i;
                                        break;
                                    }
                                    i += 1;
                                }
                                this.DoFormGenInteraction(ell);
                                break;
                            }
                        }
                        break;
                    }
                case "CHECKBOX":
                    {
                        var i = 0;
                        for (var _m = 0, _o = THEEL.elContent; _m < _o.length; _m++) {
                            var vv = _o[_m];
                            i += 1;
                            var el = (document.getElementById(THEEL.elID + "_" + i.toString()));
                            for (var _p = 0, UIValues_7 = UIValues; _p < UIValues_7.length; _p++) {
                                var theval = UIValues_7[_p];
                                if (theval.uivID == el.id) {
                                    if (theval.uivValue.toUpperCase() == "TRUE") {
                                        el.checked = true;
                                    }
                                    else {
                                        el.checked = false;
                                    }
                                    this.DoFormGenInteraction(el);
                                    break;
                                }
                            }
                        }
                        break;
                    }
            }
        }
    };
    /**
     * SetFormVersion
     * versionstring: string
     */
    FormGenBS.prototype.SetFormVersion = function (versionstring) {
        this.theVersionString = versionstring;
    };
    /**
     * GetFormVersion
     */
    FormGenBS.prototype.GetFormVersion = function () {
        return this.theVersionString + "";
    };
    /**
     * SetFormDataFromString
     *  theString: string
     */
    FormGenBS.prototype.SetFormDataFromString = function (theString) {
        var v = (JSON.parse(theString));
        this.SetFormData(v);
    };
    /**
     * GetFormScore
     */
    FormGenBS.prototype.GetFormScore = function () {
        var score = 0;
        for (var _i = 0, _a = this.theUIElements; _i < _a.length; _i++) {
            var THEEL = _a[_i];
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        if (el.value != "") {
                            var v = Number(el.dataset.fgscore);
                            score += v;
                        }
                        break;
                    }
                case "DATE":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        if (el.value != "") {
                            var v = Number(el.dataset.fgscore);
                            score += v;
                        }
                        break;
                    }
                case "NARRATIVE":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        if (el.value != "") {
                            var v = Number(el.dataset.fgscore);
                            score += v;
                        }
                        break;
                    }
                case "RADIO":
                    {
                        var i = 0;
                        for (var _b = 0, _c = THEEL.elContent; _b < _c.length; _b++) {
                            var vv = _c[_b];
                            i += 1;
                            var theid = THEEL.elID + "_" + i.toString();
                            var el = (document.getElementById(theid));
                            if (el.checked) {
                                var v = Number(el.dataset.fgscore);
                                score += v;
                            }
                        }
                        break;
                    }
                case "DROPDOWN":
                    {
                        var eli = (document.getElementById(THEEL.elID));
                        var seltext = eli.options[eli.selectedIndex].text;
                        var i = 0;
                        for (var _d = 0, _e = THEEL.elContent; _d < _e.length; _d++) {
                            var vv = _e[_d];
                            i += 1;
                            if (vv == seltext) {
                                var eli1 = (document.getElementById(THEEL.elID + '_' + i.toString()));
                                var v = Number(eli1.dataset.fgscore);
                                score += v;
                                break;
                            }
                        }
                        break;
                    }
                case "CHECKBOX":
                    {
                        var i = 0;
                        for (var _f = 0, _g = THEEL.elContent; _f < _g.length; _f++) {
                            var vv = _g[_f];
                            i += 1;
                            var theid = THEEL.elID + "_" + i.toString();
                            var el = (document.getElementById(theid));
                            if (el.checked) {
                                var v = Number(el.dataset.fgscore);
                                score += v;
                            }
                        }
                        break;
                    }
            }
        }
        return score;
    };
    /**
     * IsFormValid
     */
    FormGenBS.prototype.IsFormValid = function () {
        var isvalid = true;
        for (var _i = 0, _a = this.theUIElements; _i < _a.length; _i++) {
            var THEEL = _a[_i];
            if (THEEL.elRequired) {
                switch (THEEL.elType.toUpperCase()) {
                    case "TEXT":
                        {
                            var del = (document.getElementById("div_" + THEEL.elID));
                            if (!del.hidden) {
                                var el = (document.getElementById(THEEL.elID));
                                el.classList.remove('is-invalid');
                                el.classList.remove('is-valid');
                                if (el.value + "" == "") {
                                    isvalid = false;
                                    //el.classList.add('.was-validated');
                                    el.classList.add('is-invalid');
                                }
                                else {
                                    //el.classList.add('.was-validated');
                                    //el.classList.add(':valid');
                                }
                            }
                            break;
                        }
                    case "DATE":
                        {
                            var del = (document.getElementById("div_" + THEEL.elID));
                            if (!del.hidden) {
                                var el = (document.getElementById(THEEL.elID));
                                el.classList.remove('is-invalid');
                                el.classList.remove('is-valid');
                                if (el.value + "" == "") {
                                    isvalid = false;
                                    el.classList.add('is-invalid');
                                }
                            }
                            break;
                        }
                    case "NARRATIVE":
                        {
                            var del = (document.getElementById("div_" + THEEL.elID));
                            if (!del.hidden) {
                                var el = (document.getElementById(THEEL.elID));
                                el.classList.remove('is-invalid');
                                el.classList.remove('is-valid');
                                if (el.value + "" == "") {
                                    isvalid = false;
                                    el.classList.add('is-invalid');
                                }
                            }
                            break;
                        }
                    case "RADIO":
                        {
                            var del = (document.getElementById("div_" + THEEL.elID));
                            if (!del.hidden) {
                                var i = 0;
                                var newvalid = false;
                                for (var _b = 0, _c = THEEL.elContent; _b < _c.length; _b++) {
                                    var vv = _c[_b];
                                    i += 1;
                                    var theid = THEEL.elID + "_" + i.toString();
                                    var el = (document.getElementById(theid));
                                    if (el.checked) {
                                        newvalid = true;
                                    }
                                }
                                if (isvalid && !newvalid) {
                                    isvalid = newvalid;
                                }
                                i = 0;
                                for (var _d = 0, _e = THEEL.elContent; _d < _e.length; _d++) {
                                    var vv = _e[_d];
                                    i += 1;
                                    var theid = THEEL.elID + "_" + i.toString();
                                    var el = (document.getElementById(theid));
                                    el.classList.remove('is-invalid');
                                    el.classList.remove('is-valid');
                                    if (!newvalid) {
                                        el.classList.add("is-invalid");
                                    }
                                }
                            }
                            break;
                        }
                    case "DROPDOWN":
                        {
                            var del = (document.getElementById("div_" + THEEL.elID));
                            if (!del.hidden) {
                                var eli = (document.getElementById(THEEL.elID));
                                eli.classList.remove('is-invalid');
                                eli.classList.remove('is-valid');
                                var seltext = eli.options[eli.selectedIndex].text;
                                if (seltext + "" == "") {
                                    isvalid = false;
                                    eli.classList.add("is-invalid");
                                }
                            }
                            break;
                        }
                    case "CHECKBOX":
                        {
                            var del = (document.getElementById("div_" + THEEL.elID));
                            if (!del.hidden) {
                                var i = 0;
                                var newvalid = false;
                                for (var _f = 0, _g = THEEL.elContent; _f < _g.length; _f++) {
                                    var vv = _g[_f];
                                    i += 1;
                                    var theid = THEEL.elID + "_" + i.toString();
                                    var el = (document.getElementById(theid));
                                    if (el.checked) {
                                        newvalid = true;
                                    }
                                }
                                if (isvalid && !newvalid) {
                                    isvalid = newvalid;
                                }
                                i = 0;
                                for (var _h = 0, _j = THEEL.elContent; _h < _j.length; _h++) {
                                    var vv = _j[_h];
                                    i += 1;
                                    var theid = THEEL.elID + "_" + i.toString();
                                    var el = (document.getElementById(theid));
                                    el.classList.remove('is-invalid');
                                    el.classList.remove('is-valid');
                                    if (!newvalid) {
                                        el.classList.add("is-invalid");
                                    }
                                }
                            }
                            break;
                        }
                }
            }
        }
        return isvalid;
    };
    /**
     * ClearFormValidityVisuals
     */
    FormGenBS.prototype.ClearFormValidityVisuals = function () {
        for (var _i = 0, _a = this.theUIElements; _i < _a.length; _i++) {
            var THEEL = _a[_i];
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT":
                case "DATE":
                case "NARRATIVE":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        el.classList.remove('is-invalid');
                        el.classList.remove('is-valid');
                        break;
                    }
                case "RADIO":
                case "CHECKBOX":
                    {
                        var i = 0;
                        for (var _b = 0, _c = THEEL.elContent; _b < _c.length; _b++) {
                            var vv = _c[_b];
                            i += 1;
                            var theid = THEEL.elID + "_" + i.toString();
                            var el = (document.getElementById(theid));
                            el.classList.remove('is-invalid');
                            el.classList.remove('is-valid');
                        }
                        break;
                    }
                case "DROPDOWN":
                    {
                        var eli = (document.getElementById(THEEL.elID));
                        eli.classList.remove('is-invalid');
                        eli.classList.remove('is-valid');
                        break;
                    }
            }
        }
    };
    /**
     * DoFormGenInteraction
     */
    FormGenBS.prototype.DoFormGenInteraction = function (e) {
        for (var _i = 0, _a = this.theUIInteractions; _i < _a.length; _i++) {
            var UIi = _a[_i];
            // parse each noted interaction to see if we need to act on it
            if (e.name == UIi.elIDSource) {
                switch (e.type.toUpperCase()) {
                    case "RADIO":
                    case "CHECKBOX":
                        {
                            var radios = document.getElementsByName(e.name);
                            for (var i = 0; i < radios.length; i++) {
                                var it = radios[i];
                                if (it.value == UIi.elValueTrigger || it.hidden) {
                                    // we have the specific one that is supposed to trigger this action
                                    // first lets get the thing we are gonna trigger
                                    var thetriggeredelement = document.getElementById("div_" + UIi.elIDTarget);
                                    if (it.checked && UIi.elInteractionType == "SHOW") {
                                        // we are gonna make sure something is visible
                                        thetriggeredelement.style.display = ""; //"block";
                                    }
                                    else {
                                        if (it.checked && UIi.elInteractionType == "HIDE") {
                                            // we are gonna make sure something is hidden
                                            thetriggeredelement.style.display = "none";
                                            // here we want to recursively call itself to propigate UIInteractions down the chain
                                            var telement = document.getElementById(UIi.elIDTarget);
                                            this.DoFormGenInteraction(telement);
                                        }
                                        else {
                                            if (!it.checked && UIi.elInteractionType == "HIDE") {
                                                // we are gonna make sure something is visible
                                                thetriggeredelement.style.display = ""; // "block";
                                            }
                                            else {
                                                // we are gonna make sure something is hidden
                                                thetriggeredelement.style.display = "none";
                                                // here we want to recursively call itself to propigate UIInteractions down the chain
                                                var telement = document.getElementById(UIi.elIDTarget);
                                                this.DoFormGenInteraction(telement);
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    case "TEXT":
                    case "TEXTAREA":
                        {
                            var v = e.value.toUpperCase();
                            var thetriggeredelement = document.getElementById("div_" + UIi.elIDTarget);
                            if (v == UIi.elValueTrigger.toUpperCase()) {
                                if (UIi.elInteractionType == "SHOW") {
                                    thetriggeredelement.style.display = ""; //"block";
                                }
                                else {
                                    if (UIi.elInteractionType == "HIDE") {
                                        thetriggeredelement.style.display = "none";
                                        // here we want to recursively call itself to propigate UIInteractions down the chain
                                        var telement = document.getElementById(UIi.elIDTarget);
                                        this.DoFormGenInteraction(telement);
                                    }
                                }
                            }
                            else {
                                if (UIi.elInteractionType == "SHOW") {
                                    thetriggeredelement.style.display = "none";
                                    // here we want to recursively call itself to propigate UIInteractions down the chain
                                    var telement = document.getElementById(UIi.elIDTarget);
                                    this.DoFormGenInteraction(telement);
                                }
                                else {
                                    if (UIi.elInteractionType == "HIDE") {
                                        thetriggeredelement.style.display = ""; //"block";
                                    }
                                }
                            }
                            break;
                        }
                    case "DATE":
                        {
                            var v = e.value.toUpperCase();
                            var thetriggeredelement = document.getElementById("div_" + UIi.elIDTarget);
                            var vis = this.isVisible(e);
                            if (!vis)
                                v = "";
                            if (v != "") {
                                if (UIi.elInteractionType == "SHOW") {
                                    thetriggeredelement.style.display = ""; //"block";
                                }
                                else {
                                    if (UIi.elInteractionType == "HIDE") {
                                        thetriggeredelement.style.display = "none";
                                        e.value = "";
                                        // here we want to recursively call itself to propigate UIInteractions down the chain
                                        //var telement = document.getElementById(UIi.elIDTarget);
                                        this.DoFormGenInteraction(e);
                                    }
                                }
                            }
                            else {
                                if (UIi.elInteractionType == "SHOW") {
                                    thetriggeredelement.style.display = "none";
                                    e.value = "";
                                    // here we want to recursively call itself to propigate UIInteractions down the chain
                                    //var telement = document.getElementById(UIi.elIDTarget);
                                    this.DoFormGenInteraction(e);
                                }
                                else {
                                    if (UIi.elInteractionType == "HIDE") {
                                        thetriggeredelement.style.display = ""; //"block";
                                    }
                                }
                            }
                            break;
                        }
                    default: // SELECT HANDLED HERE
                        {
                            // this will be the select check for dropdowns
                            if (e.type.toUpperCase().startsWith("SELECT")) {
                                var v = e.value;
                                var thetriggeredelement = document.getElementById("div_" + UIi.elIDTarget);
                                if (v == UIi.elValueTrigger) {
                                    if (UIi.elInteractionType == "SHOW") {
                                        thetriggeredelement.style.display = ""; //"block";
                                    }
                                    else {
                                        if (UIi.elInteractionType == "HIDE") {
                                            thetriggeredelement.style.display = "none";
                                            // here we want to recursively call itself to propigate UIInteractions down the chain
                                            var telement = document.getElementById(UIi.elIDTarget);
                                            this.DoFormGenInteraction(telement);
                                        }
                                    }
                                }
                                else {
                                    if (UIi.elInteractionType == "SHOW") {
                                        thetriggeredelement.style.display = "none";
                                        // here we want to recursively call itself to propigate UIInteractions down the chain
                                        var telement = document.getElementById(UIi.elIDTarget);
                                        this.DoFormGenInteraction(telement);
                                    }
                                    else {
                                        if (UIi.elInteractionType == "HIDE") {
                                            thetriggeredelement.style.display = ""; //"block";
                                        }
                                    }
                                }
                            }
                            break;
                        }
                }
            }
        }
        //alert("Interacted Here current value of ");
    };
    /**
     * SetReadWrite()
     * @param RW True or False will enumerate the form and set the appropriate attributes for RW
     */
    FormGenBS.prototype.SetReadWrite = function (RW) {
        for (var _i = 0, _a = this.theUIElements; _i < _a.length; _i++) {
            var THEEL = _a[_i];
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT":
                case "DATE":
                case "NARRATIVE":
                    {
                        var el = (document.getElementById(THEEL.elID));
                        if (RW) {
                            el.removeAttribute('readonly');
                        }
                        else {
                            el.setAttribute('readonly', '');
                        }
                        break;
                    }
                case "RADIO":
                case "CHECKBOX":
                    {
                        var i = 0;
                        for (var _b = 0, _c = THEEL.elContent; _b < _c.length; _b++) {
                            var vv = _c[_b];
                            i += 1;
                            var theid = THEEL.elID + "_" + i.toString();
                            var el = (document.getElementById(theid));
                            if (RW) {
                                el.removeAttribute('disabled');
                            }
                            else {
                                el.setAttribute('disabled', '');
                            }
                        }
                        break;
                    }
                case "DROPDOWN":
                    {
                        var eli = (document.getElementById(THEEL.elID));
                        if (RW) {
                            eli.removeAttribute('disabled');
                        }
                        else {
                            eli.setAttribute('disabled', '');
                        }
                        break;
                    }
            }
        }
    };
    // use in propigation of UIInteractions on visibiliy checks
    FormGenBS.prototype.isVisible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    };
    return FormGenBS;
}());
exports.FormGenBS = FormGenBS;
var UIElement = /** @class */ (function () {
    function UIElement(elformrow, elid, eltype, ellabel, elcontent, elrequired, elinteractions, elinitialvisibility, elstyle, ellabelstyle, elformstyle, elscore, elautosize, elcustomclass) {
        this.elFormRow = elformrow;
        this.elID = elid;
        this.elContent = elcontent;
        this.elLabel = ellabel;
        this.elRequired = elrequired;
        this.elType = eltype;
        this.elInteractions = elinteractions;
        this.elInitialVisibility = elinitialvisibility;
        this.elStyle = elstyle;
        this.elLabelStyle = ellabelstyle;
        this.elFormStyle = elformstyle;
        this.elScore = elscore;
        if (elautosize == undefined) {
            this.elAutoSize = false;
        }
        else {
            this.elAutoSize = elautosize;
        }
        if (elcustomclass == undefined) {
            this.elCustomClass = "";
        }
        else {
            this.elCustomClass = elcustomclass;
        }
    }
    return UIElement;
}());
exports.UIElement = UIElement;
var UIInteraction = /** @class */ (function () {
    function UIInteraction(elidsource, elidtarget, elinteractiontype, elvaluetrigger) {
        this.elIDSource = elidsource;
        this.elIDTarget = elidtarget;
        this.elInteractionType = elinteractiontype;
        this.elValueTrigger = elvaluetrigger;
    }
    return UIInteraction;
}());
exports.UIInteraction = UIInteraction;
var UIValue = /** @class */ (function () {
    function UIValue(id, value) {
        this.uivID = id;
        this.uivValue = value;
    }
    return UIValue;
}());
exports.UIValue = UIValue;
//# sourceMappingURL=FormGenBS.js.map