"use strict";
/// <reference path="node_modules/@types/jquery/index.d.ts" />;
/// <reference path="node_modules/@types/bootstrap/index.d.ts" />;
Object.defineProperty(exports, "__esModule", { value: true });
var FormGenBS = /** @class */ (function () {
    function FormGenBS(DomElementID, UIElements, VersionString, JSobjectName) {
        this.theUIInteractions = [];
        this.theUIElements = [];
        this.theVersionString = "";
        this.JSOBJECTNAME = "";
        this.EnableGreenbar = false;
        this.GreenBarColor = "lightgreen";
        this.AllowInteractions = true;
        this.TheInputIDs = [];
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
        // sort the array first by the rows
        UIElements.sort(function (a, b) {
            if (a.elFormRow < b.elFormRow)
                return -1;
            if (a.elFormRow > b.elFormRow)
                return 1;
            return 0;
        });
        // Clear the existing arrays of other stuff 
        this.theUIElements = [];
        this.theUIInteractions = [];
        // Lets kill the existing string array of InputIDs to clear the list for repopulation
        this.TheInputIDs = [];
        // Now we want to Pupulate the Saved UIELEMENTS array with each element from the sorted handed in
        // uielements but we want to renumber the ROWIDs so they are not sparce and are ordinal.
        // This should prevent Holes in the output
        var rc = 0;
        var oldID = 0;
        for (var _i = 0, UIElements_1 = UIElements; _i < UIElements_1.length; _i++) {
            var THEEL = UIElements_1[_i];
            if (THEEL.elFormRow != oldID) {
                rc += 1;
                oldID = THEEL.elFormRow;
                THEEL.elFormRow = rc;
                this.theUIElements.push(THEEL);
            }
            else {
                THEEL.elFormRow = rc;
                this.theUIElements.push(THEEL);
            }
        }
        // this.theUIElements should now contain a renumbered array of stuff
        UIElements = this.theUIElements;
        // save the handed in UIElements for further processing later
        // this.theUIElements = UIElements;
        // here we will preparse the UIElements to determine the formgrouping 
        // for the purposes of selecting the appropriate columnar layout characteristics
        // to employ for each form row
        var FROWS = [];
        var BOOTSTRAPTAGS = [];
        var FROWTAGS = [];
        var row = 0;
        var cnt = 0;
        var eventwirup = this.JSOBJECTNAME + ".DOINTERACTION(this)";
        for (var _a = 0, UIElements_2 = UIElements; _a < UIElements_2.length; _a++) {
            var THEEL = UIElements_2[_a];
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
        //for (let i = FROWS.length; i < UIElements.length; i++) {
        //    FROWS.push(cnt);
        //    FROWS.push(cnt);
        //    FROWS.push(cnt);
        //    FROWS.push(cnt);
        //    FROWS.push(cnt);
        // }
        cnt = 0;
        //for (let i = FROWS.length; i < UIElements.length; i++) { FROWS.push(cnt); FROWS.push(cnt); FROWS.push(cnt); FROWS.push(cnt); }
        // we now have an array of numbers the ordinal position in that array has the number of
        // elements that are in that forms row as defined by the UIElements array handed in
        // Starting from 1 (The Zero element in the array should have 0 in it so its 1 based)
        // assuming that the numbered rows handed in started at 1...
        // now lets iterate over the list of FORM ROWS and determine the BOOTSTRAP Tags to employ on each of those rows
        for (var _b = 0, FROWS_1 = FROWS; _b < FROWS_1.length; _b++) {
            var RRR = FROWS_1[_b];
            if (RRR != 0) {
                switch (RRR) {
                    case 1: {
                        BOOTSTRAPTAGS.push("col-md-12");
                        for (var _c = 0, UIElements_3 = UIElements; _c < UIElements_3.length; _c++) {
                            var THEEL = UIElements_3[_c];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 2: {
                        BOOTSTRAPTAGS.push("col-md-6");
                        for (var _d = 0, UIElements_4 = UIElements; _d < UIElements_4.length; _d++) {
                            var THEEL = UIElements_4[_d];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 3: {
                        BOOTSTRAPTAGS.push("col-md-4");
                        for (var _e = 0, UIElements_5 = UIElements; _e < UIElements_5.length; _e++) {
                            var THEEL = UIElements_5[_e];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 4: {
                        BOOTSTRAPTAGS.push("col-md-3");
                        for (var _f = 0, UIElements_6 = UIElements; _f < UIElements_6.length; _f++) {
                            var THEEL = UIElements_6[_f];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 6: {
                        BOOTSTRAPTAGS.push("col-md-2");
                        for (var _g = 0, UIElements_7 = UIElements; _g < UIElements_7.length; _g++) {
                            var THEEL = UIElements_7[_g];
                            if (THEEL.elFormRow == cnt) {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }
                        break;
                    }
                    case 12: {
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
                    default: {
                        BOOTSTRAPTAGS.push("col-md-1");
                        for (var _j = 0, UIElements_9 = UIElements; _j < UIElements_9.length; _j++) {
                            var THEEL = UIElements_9[_j];
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
        for (var _k = 0, BOOTSTRAPTAGS_1 = BOOTSTRAPTAGS; _k < BOOTSTRAPTAGS_1.length; _k++) {
            var CBTAG = BOOTSTRAPTAGS_1[_k];
            CURROW += 1;
            if (this.EnableGreenbar) {
                if (CURROW % 2 === 0) // even
                 {
                    innerhtml += '<div class="form-row" >';
                }
                else {
                    innerhtml += '<div class="form-row" style="background-color:' + this.GreenBarColor + '" >';
                }
            }
            else {
                // If the calculated style for the Current Row is empty dont emit a STYLE tag
                if (FROWTAGS[CURROW - 1] !== '')
                    innerhtml += '<div class="form-row" style="' + FROWTAGS[CURROW - 1] + '" >';
                else
                    innerhtml += '<div class="form-row" >';
            }
            for (var _l = 0, UIElements_10 = UIElements; _l < UIElements_10.length; _l++) {
                var THEEL = UIElements_10[_l];
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
                                for (var _m = 0, _o = THEEL.elInteractions; _m < _o.length; _m++) {
                                    var v = _o[_m];
                                    this.theUIInteractions.push(v);
                                }
                                innerhtml += '<input type="text" class="' + CC + '" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" > ';
                            }
                            // store the ID for Interactivity processing
                            this.TheInputIDs.push(THEEL.elID);
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
                                for (var _p = 0, _q = THEEL.elInteractions; _p < _q.length; _p++) {
                                    var v = _q[_p];
                                    this.theUIInteractions.push(v);
                                }
                                innerhtml += '<input type="date" class="' + CC + '" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" > ';
                            }
                            // store the ID for Interactivity processing
                            this.TheInputIDs.push(THEEL.elID);
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
                                for (var _r = 0, _s = THEEL.elInteractions; _r < _s.length; _r++) {
                                    var v = _s[_r];
                                    this.theUIInteractions.push(v);
                                }
                                innerhtml += '<textarea rows="5" cols="40" class="' + CC + '" name="' + THEEL.elID + '" id="'
                                    + THEEL.elID + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" ></textarea> ';
                            }
                            // store the ID for Interactivity processing
                            this.TheInputIDs.push(THEEL.elID);
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
                            for (var _t = 0, _u = THEEL.elContent; _t < _u.length; _t++) {
                                var v = _u[_t];
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
                                    for (var _v = 0, _w = THEEL.elInteractions; _v < _w.length; _v++) {
                                        var v_1 = _w[_v];
                                        this.theUIInteractions.push(v_1);
                                    }
                                    innerhtml += '<input type="radio" class="' + CC + '" ' +
                                        'name = "' + THEEL.elID + '" id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v + '</label>';
                                }
                                // store the ID for Interactivity processing
                                this.TheInputIDs.push(THEEL.elID + '_' + i.toString());
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
                                for (var _x = 0, _y = THEEL.elInteractions; _x < _y.length; _x++) {
                                    var v = _y[_x];
                                    this.theUIInteractions.push(v);
                                }
                                innerhtml += '<select name="' + THEEL.elID +
                                    '" class="' + CC + '" id="' + THEEL.elID +
                                    '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" >';
                            }
                            // store the ID for Interactivity processing
                            this.TheInputIDs.push(THEEL.elID);
                            // Lets put the Watermark in here
                            innerhtml += '<option value="" disabled selected hidden>Please Select </option>';
                            var i = 0;
                            for (var _z = 0, _0 = THEEL.elContent; _z < _0.length; _z++) {
                                var v = _0[_z];
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
                            for (var _1 = 0, _2 = THEEL.elContent; _1 < _2.length; _1++) {
                                var v = _2[_1];
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
                                    for (var _3 = 0, _4 = THEEL.elInteractions; _3 < _4.length; _3++) {
                                        var v_2 = _4[_3];
                                        this.theUIInteractions.push(v_2);
                                    }
                                    innerhtml += '<input type="checkbox" ' +
                                        'name = "' + THEEL.elID + '" class="' + CC + '"  id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" onchange="' + eventwirup + '" style="' + THEEL.elFormStyle + '" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v + '</label>';
                                }
                                // store the ID for Interactivity processing
                                this.TheInputIDs.push(THEEL.elID + '_' + i.toString());
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
                                for (var _5 = 0, _6 = THEEL.elContent; _5 < _6.length; _5++) {
                                    var v = _6[_5];
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
        for (var _7 = 0, UIElements_11 = UIElements; _7 < UIElements_11.length; _7++) {
            var THEEL = UIElements_11[_7];
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT": {
                    var el = (document.getElementById(THEEL.elID));
                    if (THEEL.elScore != undefined && typeof THEEL.elScore[0] == 'undefined' && el != null && el.dataset["fgscore"] !== undefined) {
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
                    if (THEEL.elScore != undefined && typeof THEEL.elScore[0] == 'undefined') {
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
                    if (THEEL.elScore != undefined && typeof THEEL.elScore[0] == 'undefined') {
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
                    for (var _8 = 0, _9 = THEEL.elScore; _8 < _9.length; _8++) {
                        var v = _9[_8];
                        i += 1;
                        var el = (document.getElementById(THEEL.elID + '_' + i.toString()));
                        if (el !== null) {
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
                    }
                    break;
                }
                case "DROPDOWN": {
                    var i = 0;
                    for (var _10 = 0, _11 = THEEL.elScore; _10 < _11.length; _10++) {
                        var v = _11[_10];
                        i += 1;
                        var ell = (document.getElementById(THEEL.elID + '_' + i.toString()));
                        if (ell !== null) {
                            ell.dataset.fgscore = v.toString();
                            if (THEEL.elRequired) {
                                ell.dataset.fgrequired = "YES";
                            }
                            else {
                                ell.dataset.fgrequired = "NO";
                            }
                        }
                    }
                    break;
                }
                case "CHECKBOX": {
                    var i = 0;
                    for (var _12 = 0, _13 = THEEL.elScore; _12 < _13.length; _12++) {
                        var v = _13[_12];
                        i += 1;
                        var el = (document.getElementById(THEEL.elID + '_' + i.toString()));
                        if (el !== null) {
                            el.dataset.fgscore = v.toString();
                            if (THEEL.elRequired) {
                                el.dataset.fgrequired = "YES";
                            }
                            else {
                                el.dataset.fgrequired = "NO";
                            }
                        }
                    }
                    break;
                }
            }
        }
    };
    /**
     * GetFormData
     *
     * @returns UIValue[] of the forms current answers to the question elements on the current form
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
     *
     * @returns JSON.Stringify() result of the GetFormData() method.
     */
    FormGenBS.prototype.GetFormDataAsString = function () {
        return JSON.stringify(this.GetFormData());
    };
    /**
     * GetFormDefinition
     *
     * @returns a UIElement[] of the forms current content for its definition.
     */
    FormGenBS.prototype.GetFormDefinition = function () {
        return this.theUIElements;
    };
    /**
     * GetFormDefinitionAsString
     * Returns the JSON.Stringify() result of the GetFormDefinition() call.
     * Used to save a forms definition elsewhere so it can restored with a call to SetFormDefinition().
     *
     * @returns JSON.Stringify() array of UIElements
     */
    FormGenBS.prototype.GetFormDefinitionAsString = function () {
        return JSON.stringify(this.GetFormDefinition());
    };
    /**
     * SetFormDefinition
     * @param TheFormDefinitionAsString: string
     *
     * Takes a JSON.Stringify result of the GetFormDefinition() call and rehydrates the form to restore its content.
     */
    FormGenBS.prototype.SetFormDefinition = function (TheFormDefinitionAsString) {
        var Self = this;
        Self.HydrateForm(JSON.parse(TheFormDefinitionAsString));
    };
    /**
     * SetFormDefinitionFromObject
     * @param UIElementArray: UIElement[]
     *
     * Takes an array of UUElements and applys that to the forms definition overwriting the existing forms definition
     */
    FormGenBS.prototype.SetFormDefinitionFromObject = function (UIElementArray) {
        var Self = this;
        Self.HydrateForm(UIElementArray);
    };
    /**
     * GetFormDefinitionFrom
     * @param webUrl: string
     * Attempts to do a simple GET from the supplied URL to fetch the definition for a form as a JSON.Stringify()
     * result of an array of UIElements. Used to fetch forms definition from webservice endpoints.
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
     * GetRoAtYCoordinate
     * @param YCord
     */
    FormGenBS.prototype.GetRowAtYCoordinate = function (YCord) {
        var x = document.getElementsByClassName("form-row");
        var Row = 0;
        var THeight = 0;
        var i = 0;
        for (i = 0; i < x.length; i++) {
            console.log("Iterating through Row " + i + " Height " + x[i].offsetHeight);
            THeight += x[i].offsetHeight;
            if (THeight > YCord && x[i].offsetHeight > 0) {
                Row = i + 1;
                break;
            }
        }
        console.log("Returned ROW " + Row);
        return Row;
    };
    /**
     * SetFormData
     *  @param UIValues: UIValue[]
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
                                var i = 1;
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
     * @param versionstring: string
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
     *  @param theString: string
     *
     * Takes a JSON serialization (Stringify) of an array of UIValue elements and attempts to apply
     * the vakues to the current form. Used to restore a forms entries gathered by a call to
     * GetFormDataAsString()
     */
    FormGenBS.prototype.SetFormDataFromString = function (theString) {
        var v = (JSON.parse(theString));
        this.SetFormData(v);
    };
    /**
     * GetFormScore
     *
     * Walks the forms content and for elements that had a weight to be applied to them in the SCORE Array for the element will
     * calculate the SUM score
     *
     * @return score as a number.
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
     *
     * Walks the forms contents and seeks to apply simple valitity rules to the contained elements
     * I.E. Text field have something in them, Radio and Checkbox button groups have something selected,
     * Dropdowns have something selected, Dates have a selected value. This based on if the forms
     * definition indicated that the element was required. Will engage HTML highlighting on invalid
     * items
     *
     * @returns Boolean validity indication True or False
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
     * GetWholeForm
     *      Returns the JSON.stringify of a FormGenDefCon object representing
     *      The Forms current definition with all of its controls and interactions
     *      The Forms current answers made by the user of the forms
     *
     * Used to persist the data of the current forms state in cases where we want to save completed forms for example.
     * leverages the existing sub calls that get Forms definition and the answers seperately so as they are augmented
     * this will also carry those augmentations automatically
     *
     * @returns FormGenDefCon object that has been serialized into a simple string
     *
     */
    FormGenBS.prototype.GetWholeForm = function () {
        var TheForm = new FormGenDefCon("", "");
        TheForm.FGDFDefinition = this.GetFormDefinitionAsString();
        TheForm.FGDFContent = this.GetFormDataAsString();
        return JSON.stringify(TheForm);
    };
    /**
     * SetWholeForm
     * @param TheFormDefCon
     *      Takes a JSON.Stringify of a FormGenDefCon object and rehydrates a forms definition and fills in the answers
     *      entered into that forms definition in one fell swoop
     *
     * used to rehydrate both a forms content and the answerd entered into that content and is essentially the reverse
     * of the GetWholeForm method above.
     * leverages the existing sub calls that set Forms definition and fills answers seperately so as they are augmented
     * this will also carry those augmentations automatically
     *
     */
    FormGenBS.prototype.SetWholeForm = function (TheFormDefCon) {
        var TheForm = new FormGenDefCon("", "");
        TheForm = JSON.parse(TheFormDefCon);
        this.SetFormDefinition(TheForm.FGDFDefinition);
        this.AllowInteractions = false;
        this.SetFormDataFromString(TheForm.FGDFContent);
        this.AllowInteractions = true;
        this.DoFormGenInteraction('');
    };
    /**
     * ClearFormValidityVisuals
     *
     * Will clear the elemet validity cue's applied tothe forms visuals by IsFormValid()
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
     * @param e HtmlElement that triggered the event or empty string
     *
     * Walks the interaction tree and engages all interaction logic based on values entered into the current form
     */
    FormGenBS.prototype.DoFormGenInteraction = function (e) {
        if (this.AllowInteractions) {
            for (var _i = 0, _a = this.TheInputIDs; _i < _a.length; _i++) {
                var INPUTIDELEMENT = _a[_i];
                e = document.getElementById(INPUTIDELEMENT);
                for (var _b = 0, _c = this.theUIInteractions; _b < _c.length; _b++) {
                    var UIi = _c[_b];
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
                                                    //this.DoFormGenInteraction(telement);
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
                                                        //this.DoFormGenInteraction(telement);
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
                                                //this.DoFormGenInteraction(telement);
                                            }
                                        }
                                    }
                                    else {
                                        if (UIi.elInteractionType == "SHOW") {
                                            thetriggeredelement.style.display = "none";
                                            // here we want to recursively call itself to propigate UIInteractions down the chain
                                            var telement = document.getElementById(UIi.elIDTarget);
                                            //this.DoFormGenInteraction(telement);
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
                                                //e.value = "";
                                                // here we want to recursively call itself to propigate UIInteractions down the chain
                                                //var telement = document.getElementById(UIi.elIDTarget);
                                                //this.DoFormGenInteraction(e);
                                            }
                                        }
                                    }
                                    else {
                                        if (UIi.elInteractionType == "SHOW") {
                                            thetriggeredelement.style.display = "none";
                                            //e.value = "";
                                            // here we want to recursively call itself to propigate UIInteractions down the chain
                                            //var telement = document.getElementById(UIi.elIDTarget);
                                            //this.DoFormGenInteraction(e);
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
                                                    //this.DoFormGenInteraction(telement);
                                                }
                                            }
                                        }
                                        else {
                                            if (UIi.elInteractionType == "SHOW") {
                                                thetriggeredelement.style.display = "none";
                                                // here we want to recursively call itself to propigate UIInteractions down the chain
                                                var telement = document.getElementById(UIi.elIDTarget);
                                                //this.DoFormGenInteraction(telement);
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
    /**
     * GreenBarEnabled()
     * Turns on the automatic alternate coloring scheme for renderd rows. The default color LightGreen
     * can be changed by using SetGreenBarColor()
     */
    FormGenBS.prototype.GreenBarEnabled = function () {
        this.EnableGreenbar = true;
        var Self = this;
        Self.HydrateForm(Self.theUIElements);
    };
    /**
     * GreenBarDisabled()
     * Turns off the automatic alternate coloring scheme for renderd rows.
     */
    FormGenBS.prototype.GreenBarDisabled = function () {
        this.EnableGreenbar = false;
        var Self = this;
        Self.HydrateForm(Self.theUIElements);
    };
    /**
     * SetGreenBarColor()
     * @param TheColor a string representation of the color to employ for the greenbar coloration. HTML compatable string representation of the color
     *
     */
    FormGenBS.prototype.SetGreenBarColor = function (TheColor) {
        this.GreenBarColor = TheColor;
        if (this.EnableGreenbar) {
            var Self = this;
            Self.HydrateForm(Self.theUIElements);
        }
    };
    FormGenBS.prototype.TestModalCrap = function () {
        var elem = document.createElement('div');
        var elem1a = document.createElement('div');
        var elem1 = document.createElement('div');
        var elem2 = document.createElement('div');
        var elem3 = document.createElement('h5');
        var elem4 = document.createElement('button');
        var elem5 = document.createElement('span');
        var elem6 = document.createElement('div');
        var TheMainObject = document.getElementById(this.theContainer);
        // First we want to  try to remove the existing Dialog element if one is there
        var elem2Remove = document.querySelector('#FormGenGeneratedModalDialog');
        if (elem2Remove !== null) {
            // Ok we got something so lets give it he axe...
            TheMainObject.removeChild(elem2Remove);
        }
        // Move on now and make a new one and insert it
        elem.id = "FormGenGeneratedModalDialog";
        elem.setAttribute("class", "modal fade");
        //elem.className = "modal fade";
        elem.tabIndex = -1;
        elem.setAttribute("aria-labelledby", "FormGenGeneratedModalDialogLabel");
        elem.setAttribute("aria-hidden", "true");
        elem1.setAttribute("class", "modal-dialog");
        elem1.setAttribute("role", "document");
        elem1a.setAttribute("class", "modal-content");
        elem2.setAttribute("class", "modal-header");
        elem3.setAttribute("class", "modal-title");
        elem3.id = "FormGenGeneratedModalDialogTitle";
        elem3.textContent = "Sample Title Goes Here";
        elem4.setAttribute("class", "close");
        elem4.setAttribute("data-dismiss", "modal");
        elem4.setAttribute("aria-label", "close");
        elem5.setAttribute("aria-hidden", "true");
        elem5.textContent = "X";
        elem6.setAttribute("class", "modal-body");
        elem6.textContent = "Sample Body of the dialog will go here";
        elem1.appendChild(elem1a);
        elem1a.appendChild(elem2);
        elem2.appendChild(elem3);
        elem2.appendChild(elem4);
        elem4.appendChild(elem5);
        elem1a.appendChild(elem6);
        elem.appendChild(elem1);
        TheMainObject.appendChild(elem);
        $('#FormGenGeneratedModalDialog').modal('show');
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
var FormGenDefCon = /** @class */ (function () {
    function FormGenDefCon(FGDFD, FGDFC) {
        this.FGDFDefinition = FGDFD;
        this.FGDFContent = FGDFC;
    }
    return FormGenDefCon;
}());
exports.FormGenDefCon = FormGenDefCon;
//# sourceMappingURL=FormGenBS.js.map