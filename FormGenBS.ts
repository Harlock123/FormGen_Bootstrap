class FormGenBS {

    private theUIInteractions: UIInteraction[] = [];
    private theContainer: string;
    private theUIElements: UIElement[];
    private theVersionString: string = "";

    constructor(DomElementID: string, UIElements: UIElement[],VersionString: string) {
        
        // set the form version here
        this.theVersionString = VersionString;
        
        // DomElementID will be the container for all the inserted form content

        // save the containerID for further use elsewhere
        this.theContainer = DomElementID;

        this.HydrateForm(UIElements);

    }

    private HydrateForm(UIElements: UIElement[]) {
        // save the handed in UIElements for further processing later
        this.theUIElements = UIElements;

        // here we will preparse the UIElements to determine the formgrouping 
        // for the purposes of selecting the appropriate columnar layout characteristics
        // to employ for each form row

        var FROWS: number[] = [];
        var BOOTSTRAPTAGS: string[] = [];
        var FROWTAGS: string[] = [];
        var row = 0;
        var cnt = 0;

        for (let THEEL of UIElements) {
            if (THEEL.elFormRow != row)
            {
                // we have a new row lets push the old row
                FROWS.push(cnt);
                cnt = 1;
                row = THEEL.elFormRow;
            }
            else
            {
                cnt += 1;
            }
        }

        FROWS.push(cnt);
        cnt = 0;

        // we now have an array of numbers the ordinal position in that array has the number of
        // elements that are in that forms row as defined by the UIElements array handed in
        // Starting from 1 (The Zero element in the array should have 0 in it so its 1 based)
        // assuming that the numbered rows handed in started at 1...

        // now lets iterate over the list of FORM ROWS and determine the BOOTSTRAP Tags to employ on each of those rows

        for (let RRR of FROWS)
        {
            if (RRR != 0)
            {
                switch (RRR) {
                    case 1: {
                        BOOTSTRAPTAGS.push("col-md-12");
                        
                        for (let THEEL of UIElements) {
                            if (THEEL.elFormRow == cnt)
                            {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }

                        break;
                    }
                    case 2: {
                        BOOTSTRAPTAGS.push("col-md-6");
                        
                        for (let THEEL of UIElements) {
                            if (THEEL.elFormRow == cnt)
                            {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }

                        break;
                    }
                    case 3: {
                        BOOTSTRAPTAGS.push("col-md-4");
                        
                        for (let THEEL of UIElements) {
                            if (THEEL.elFormRow == cnt)
                            {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }

                        break;
                    }
                    case 4: {
                        BOOTSTRAPTAGS.push("col-md-3");
                        
                        for (let THEEL of UIElements) {
                            if (THEEL.elFormRow == cnt)
                            {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }

                        break;
                    }
                    case 6: {
                        BOOTSTRAPTAGS.push("col-md-2");
                        
                        for (let THEEL of UIElements) {
                            if (THEEL.elFormRow == cnt)
                            {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }

                        break;
                    }
                    case 12: {
                        BOOTSTRAPTAGS.push("col-md-1");
                        
                        for (let THEEL of UIElements) {
                            if (THEEL.elFormRow == cnt)
                            {
                                FROWTAGS.push(THEEL.elStyle);
                                break;
                            }
                        }

                        break;
                    }
                    default: {
                        BOOTSTRAPTAGS.push("col-md-1");
                        
                        for (let THEEL of UIElements) {
                            if (THEEL.elFormRow == cnt)
                            {
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

        for(let CBTAG of BOOTSTRAPTAGS)
        {
            CURROW+=1;

            innerhtml += '<div class="form-row" style="' + FROWTAGS[CURROW-1] + '" >'; 

            for (let THEEL of UIElements) {

                if(THEEL.elFormRow == CURROW) { // We have an element that is going into the curent row

                    switch (THEEL.elType.toUpperCase()) {
                        case "TEXT": {

                            // here we decode the elFormStyle element if its present

                            var STY = "";
        
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            innerhtml += '<div class="' + CBTAG + '" >';
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label>';
        
                            if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                innerhtml += '<input type="text" class="form-control input-md" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" style="' + THEEL.elFormStyle +'"  > ';
                            }
                            else {
                                for (let v of THEEL.elInteractions) {
                                    this.theUIInteractions.push(v);
                                }
        
                                innerhtml += '<input type="text" class="form-control input-md" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" onchange="DoFormGenInteraction(this)" style="' + THEEL.elFormStyle +'" > ';
        
                            }        
                                    
                            innerhtml += '</div></div> ';
        
                            break;
        
                        }
                        case "DATE": {
                            // here we decode the elFormStyle element if its present
        
                            var STY = "";
        
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            innerhtml += '<div class="' + CBTAG + '" >';
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label>';
                                   
                            if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                innerhtml += '<input type="date" class="form-control input-md" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" style="' + THEEL.elFormStyle +'" > ';
                            }
                            else {
                                for (let v of THEEL.elInteractions) {
                                    this.theUIInteractions.push(v);
                                }
        
                                innerhtml += '<input type="date" class="form-control input-md" name = "' + THEEL.elID +
                                    '" id="' + THEEL.elID + '" onchange="DoFormGenInteraction(this)" style="' + THEEL.elFormStyle +'" > ';
        
                            }       
                           
                            innerhtml += '</div></div> ';
        
                            break;
        
                        }
                        case "NARRATIVE": {
                            // here we decode the elFormStyle element if its present
   
                            var STY = "";
        
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
                            
                            innerhtml += '<div class="' + CBTAG + '" >';
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label>';
        
                            if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                innerhtml += '<textarea rows="5" cols="40" class="form-control input-md" name="' + THEEL.elID + '" id="'
                                    + THEEL.elID + '" style="' + THEEL.elFormStyle +'" ></textarea> ';
                            }
                            else {
                                for (let v of THEEL.elInteractions) {
                                    this.theUIInteractions.push(v);
                                }
        
                                innerhtml += '<textarea rows="5" cols="40" class="form-control input-md" name="' + THEEL.elID + '" id="'
                                    + THEEL.elID + '" onchange="DoFormGenInteraction(this)" style="' + THEEL.elFormStyle +'" ></textarea> ';
        
                            }
        
                            innerhtml += '</div></div> ';
        
                            break;
        
                        }
                        case "RADIO": {
                            // here we decode the elFormStyle element if its present

                            var STY = "";
        
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
        
                            innerhtml += '<div class="' + CBTAG + '" >';
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="div_' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label><br /> ';
                                    
                            let i = 0;
                            for (let v of THEEL.elContent) {
                                i += 1;

                                //var vdiv = '<div style="' + THEEL.elLabelStyle + '" >' + v + "</div> ";

                                //innerhtml += '<div class="custom-control custom-radio custom-control-inline">';

                                innerhtml += '<div class="form-check form-check-inline">';
        
        
                                if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                    //innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v + '</label>';
                                    innerhtml += '<input type="radio" class="form-check-input" ' +
                                        'name = "' + THEEL.elID + '" id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" style="' + THEEL.elFormStyle +'" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="form-check-label" >' + v + '</label>';
                                }
                                else {
                                    for (let v of THEEL.elInteractions) {
                                        this.theUIInteractions.push(v);
                                    }
                                    //innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v + '</label>';
                                    innerhtml += '<input type="radio" class="form-check-input" ' +
                                        'name = "' + THEEL.elID + '" id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" onchange="DoFormGenInteraction(this)" style="' + THEEL.elFormStyle +'" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="form-check-label" >' + v + '</label>';
                                }

                                innerhtml+= "</div>";
                            }
        
                            innerhtml += '</div></div> ';
        
                            break;
                        }
                        case "DROPDOWN": {
                            // here we decode the elFormStyle element if its present

                            var STY = "";
        
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
        
                            innerhtml += '<div class="' + CBTAG + '" >';
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label>';
        
                            if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                innerhtml += '<select name="' + THEEL.elID + '" class="form-control input-md" id="' + 
                                THEEL.elID + '" style="' + THEEL.elFormStyle +'" >';
                            }
                            else {
                                for (let v of THEEL.elInteractions) {
                                    this.theUIInteractions.push(v);
                                }
        
                                innerhtml += '<select name="' + THEEL.elID +
                                    '" class="form-control input-md" id="' + THEEL.elID + 
                                    '" onchange="DoFormGenInteraction(this)" style="' + THEEL.elFormStyle +'" >';
                            }
        
                            let i = 0;
                            for (let v of THEEL.elContent) {
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
        
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
        
                            innerhtml += '<div class="' + CBTAG + '" >';
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="div_' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label><br />';
        
                            let i = 0;
                            for (let v of THEEL.elContent) {
                                i += 1;

                                //innerhtml += '<div class="custom-control custom-checkbox custom-control-inline">';

                                innerhtml += '<div class="form-check form-check-inline">';
        
                                if (!Array.isArray(THEEL.elInteractions) || !THEEL.elInteractions.length) {
                                    //innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v ;
                                    innerhtml += '<input type="checkbox" ' +
                                        'name = "' + THEEL.elID + '" class="form-check-input" id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" style="' + THEEL.elFormStyle +'" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="form-check-label" >' + v + '</label>';
                                }
                                else {
                                    for (let v of THEEL.elInteractions) {
                                        this.theUIInteractions.push(v);
                                    }
                                    //innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="custom-control-label" >' + v ;
                                    innerhtml += '<input type="checkbox" ' +
                                        'name = "' + THEEL.elID + '" class="form-check-input" id="' +
                                        THEEL.elID + '_' + i.toString() + '" ' +
                                        'value="' + v + '" onchange="DoFormGenInteraction(this)" style="' + THEEL.elFormStyle +'" >';
                                    innerhtml += '<label for="' + THEEL.elID + '_' + i.toString() + '" class="form-check-label" >' + v + '</label>';
                                }

                                innerhtml+= "</div>";
                            }
        
                            innerhtml += '</div></div> ';
        
                            break;
        
                        }
                        case "INFOTEXT": {
                            var STY = "";
        
                            if (THEEL.elStyle != "") {
                                STY = ' style="' + THEEL.elStyle + '" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
        
                            innerhtml += '<div class="' + CBTAG + '" >';
                            innerhtml += '<div class="form-group" id="' + 'div_' + THEEL.elID + '" ' + VIS + STY + ' >';
                            innerhtml += '<label for="div_' + THEEL.elID + '" style="' + THEEL.elLabelStyle + '" >';
                            innerhtml += THEEL.elLabel;
                            innerhtml += '</label><br />';

                            if (THEEL.elContent.length != 0) {
                                // we have some items for an actual list

                                innerhtml += '<ul style="' + THEEL.elFormStyle + '">';

                                for (let v of THEEL.elContent)
                                {
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
                            else
                            {
                                STY = ' style="text-align:center;vertical-align:middle;margin-bottom:0" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
        
                            innerhtml += '<div class="' + CBTAG + '" >';
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
                            else
                            {
                                STY = ' style="text-align:centervertical-align:middle;margin-bottom:0" ';
                            }
        
                            var VIS = "";//'style="display:block"';
        
                            if (!THEEL.elInitialVisibility) {
                                VIS = 'style="display:none"';
                            }
        
                            innerhtml += '<div class="' + CBTAG + '" >';
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
        for (let THEEL of UIElements) {
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT": {

                    var el = <HTMLElement>(document.getElementById(THEEL.elID));

                    if (typeof THEEL.elScore[0] == 'undefined')
                    {
                        el.dataset.fgscore = "0";

                    }
                    else
                    {
                        el.dataset.fgscore = THEEL.elScore[0].toString();
                    }
                    
                    if (THEEL.elRequired) {
                        el.dataset.fgrequired = "YES";
                    }
                    else {
                        el.dataset.fgrequired = "NO";
                    }

                    break;
                }
                case "DATE": {
                    var el = <HTMLElement>(document.getElementById(THEEL.elID));

                    if (typeof THEEL.elScore[0] == 'undefined')
                    {
                        el.dataset.fgscore = "0";

                    }
                    else
                    {
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
                    var el = <HTMLElement>(document.getElementById(THEEL.elID));

                    if (typeof THEEL.elScore[0] == 'undefined')
                    {
                        el.dataset.fgscore = "0";

                    }
                    else
                    {
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

                    let i = 0;
                    for (let v of THEEL.elScore) {
                        i += 1;

                        var el = <HTMLElement>(document.getElementById(THEEL.elID + '_' + i.toString()));

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
                case "DROPDOWN": {

                    let i = 0;
                    for (let v of THEEL.elScore) {
                        i += 1;

                        var ell = <HTMLOptionElement>(document.getElementById(THEEL.elID + '_' + i.toString()));

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

                    let i = 0;
                    for (let v of THEEL.elScore) {
                        i += 1;

                        var el = <HTMLElement>(document.getElementById(THEEL.elID + '_' + i.toString()));

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
    }

    /**
     * GetFormData
     */
    public GetFormData() {
        var UIValues: UIValue[] = [];

        // first we want to echo the version as one of the elements
        
        var theversion = new UIValue("FORMVERSIONSTRING", this.theVersionString + "");

        UIValues.push(theversion);


        for (let THEEL of this.theUIElements) {
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT":
                    {
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        var v = new UIValue(THEEL.elID, el.value);

                        UIValues.push(v);

                        break;
                    }
                case "DATE":
                    {
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        var v = new UIValue(THEEL.elID, el.value);

                        UIValues.push(v);

                        break;
                    }
                case "NARRATIVE":
                    {
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        var tv = el.value;

                        //tv.replace('\\','\\\\'); // Excape NewLines and other control characters

                        var v = new UIValue(THEEL.elID, tv);

                        UIValues.push(v);

                        break;
                    }
                case "RADIO":
                    {
                        let i = 0;

                        for (let vv of THEEL.elContent) {
                            i += 1;

                            var theid = THEEL.elID + "_" + i.toString();

                            var el = <HTMLInputElement>(document.getElementById(theid));

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
                        var eli = <HTMLSelectElement>(document.getElementById(THEEL.elID));

                        var v = new UIValue(THEEL.elID, eli.options[eli.selectedIndex].text);

                        UIValues.push(v);

                        break;
                    }
                case "CHECKBOX":
                    {
                        let i = 0;

                        for (let vv of THEEL.elContent) {
                            i += 1;

                            var theid = THEEL.elID + "_" + i.toString();

                            var el = <HTMLInputElement>(document.getElementById(theid));

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
    }

    /**
     * GetFormDataAsString
     */
    public GetFormDataAsString() {
        return JSON.stringify(this.GetFormData());
    }

    /**
     * GetFormDefinitionFrom
     * webUrl: string   
    */
    public GetFormDefinitionFrom(webUrl: string) {
        // Will attempt to populate the for by doung an HTTP GET from the webUrl

        var Self = this;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            Self.HydrateForm(JSON.parse(this.responseText));
            }
        };
        xmlhttp.open('GET', webUrl);
        xmlhttp.send();
    }

    /**
     * SetFormData
     *  UIValues: UIValue[]
     */
    public SetFormData(UIValues: UIValue[]) {

        // look for the  version string first and set it

        for (let uivs of UIValues)
        {
            if (uivs.uivID.toLocaleUpperCase() == "FORMVERSIONSTRING")
            {
                this.theVersionString = uivs.uivValue;
                break;
            }
        }

        for (let THEEL of this.theUIElements) {
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT":
                    {
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        for (let theval of UIValues) {
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
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        for (let theval of UIValues) {
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
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        for (let theval of UIValues) {
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
                        let i = 0;

                        for (let vv of THEEL.elContent) {
                            i += 1;

                            var el = <HTMLInputElement>(document.getElementById(THEEL.elID + "_" + i.toString()));

                            for (let theval of UIValues) {
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
                        var ell = <HTMLSelectElement>(document.getElementById(THEEL.elID));

                        for (let theval of UIValues) {
                            if (theval.uivID == THEEL.elID) {

                                let i = 0;

                                for (let vv of THEEL.elContent) {
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
                        let i = 0;

                        for (let vv of THEEL.elContent) {
                            i += 1;

                            var el = <HTMLInputElement>(document.getElementById(THEEL.elID + "_" + i.toString()));

                            for (let theval of UIValues) {
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
    }

    /**
     * SetFormVersion
     * versionstring: string
     */
    public SetFormVersion(versionstring: string) {
        this.theVersionString = versionstring;
    }

    /**
     * GetFormVersion
     */
    public GetFormVersion() {
        return this.theVersionString + "";
    }

    /**
     * SetFormDataFromString
     *  theString: string
     */
    public SetFormDataFromString(theString: string) {

        var v = <UIValue[]>(JSON.parse(theString));

        this.SetFormData(v);
    }

    /**
     * GetFormScore
     */
    public GetFormScore() {

        var score: number = 0;

        for (let THEEL of this.theUIElements) {
            switch (THEEL.elType.toUpperCase()) {
                case "TEXT":
                    {
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        if (el.value != "") {
                            var v = Number(el.dataset.fgscore);

                            score += v;
                        }

                        break;
                    }
                case "DATE":
                    {
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        if (el.value != "") {
                            var v = Number(el.dataset.fgscore);

                            score += v;
                        }

                        break;
                    }
                case "NARRATIVE":
                    {
                        var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                        if (el.value != "") {
                            var v = Number(el.dataset.fgscore);

                            score += v;
                        }

                        break;
                    }
                case "RADIO":
                    {
                        let i = 0;

                        for (let vv of THEEL.elContent) {
                            i += 1;

                            var theid = THEEL.elID + "_" + i.toString();

                            var el = <HTMLInputElement>(document.getElementById(theid));

                            if (el.checked) {
                                var v = Number(el.dataset.fgscore);

                                score += v;
                            }

                        }

                        break;
                    }
                case "DROPDOWN":
                    {
                        var eli = <HTMLSelectElement>(document.getElementById(THEEL.elID));

                        var seltext = eli.options[eli.selectedIndex].text;

                        let i = 0;

                        for (let vv of THEEL.elContent) {
                            i += 1;

                            if (vv == seltext) {
                                var eli1 = <HTMLOptionElement>(document.getElementById(THEEL.elID + '_' + i.toString()));

                                var v = Number(eli1.dataset.fgscore);

                                score += v;

                                break;

                            }
                        }

                        break;
                    }
                case "CHECKBOX":
                    {
                        let i = 0;

                        for (let vv of THEEL.elContent) {
                            i += 1;

                            var theid = THEEL.elID + "_" + i.toString();

                            var el = <HTMLInputElement>(document.getElementById(theid));

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
    }

    /**
     * IsFormValid
     */
    public IsFormValid() {

        var isvalid: boolean = true;

        for (let THEEL of this.theUIElements) {
            if (THEEL.elRequired) {
                switch (THEEL.elType.toUpperCase()) {
                    case "TEXT":
                        {
                            var del = <HTMLElement>(document.getElementById("div_" + THEEL.elID));

                            if (!del.hidden) {

                                var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                                if (el.value + "" == "") {
                                    isvalid = false;
                                }
                            }

                            break;
                        }
                    case "DATE":
                        {
                            var del = <HTMLElement>(document.getElementById("div_" + THEEL.elID));

                            if (!del.hidden) {

                                var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                                if (el.value + "" == "") {
                                    isvalid = false;
                                }
                            }

                            break;
                        }
                    case "NARRATIVE":
                        {
                            var del = <HTMLElement>(document.getElementById("div_" + THEEL.elID));

                            if (!del.hidden) {

                                var el = <HTMLInputElement>(document.getElementById(THEEL.elID));

                                if (el.value + "" == "") {
                                    isvalid = false;
                                }
                            }

                            break;
                        }
                    case "RADIO":
                        {
                            var del = <HTMLElement>(document.getElementById("div_" + THEEL.elID));

                            if (!del.hidden) {

                                let i = 0;

                                let newvalid = false;

                                for (let vv of THEEL.elContent) {
                                    i += 1;

                                    var theid = THEEL.elID + "_" + i.toString();

                                    var el = <HTMLInputElement>(document.getElementById(theid));

                                    if (el.checked) {
                                        newvalid = true;
                                    }

                                }

                                if (isvalid && !newvalid)
                                    isvalid = newvalid;
                            }
                            break;
                        }
                    case "DROPDOWN":
                        {
                            var del = <HTMLElement>(document.getElementById("div_" + THEEL.elID));

                            if (!del.hidden) {

                                var eli = <HTMLSelectElement>(document.getElementById(THEEL.elID));

                                var seltext = eli.options[eli.selectedIndex].text;

                                if (seltext + "" == "") {
                                    isvalid = false;
                                }
                            }

                            break;
                        }
                    case "CHECKBOX":
                        {
                            var del = <HTMLElement>(document.getElementById("div_" + THEEL.elID));

                            if (!del.hidden) {

                                let i = 0;

                                let newvalid = false;

                                for (let vv of THEEL.elContent) {
                                    i += 1;

                                    var theid = THEEL.elID + "_" + i.toString();

                                    var el = <HTMLInputElement>(document.getElementById(theid));

                                    if (el.checked) {
                                        newvalid = true;
                                    }

                                }

                                if (isvalid && !newvalid)
                                    isvalid = newvalid;
                            }
                            break;
                        }
                }
            }
        }


        return isvalid;
    }

    /**
     * DoFormGenInteraction
     */
    public DoFormGenInteraction(e) {

        for (let UIi of this.theUIInteractions) {
            // parse each noted interaction to see if we need to act on it

            if (e.name == UIi.elIDSource) {


                switch (e.type.toUpperCase()) {
                    case "RADIO":
                    case "CHECKBOX":
                        {
                            var radios = document.getElementsByName(e.name);

                            for (let i = 0; i < radios.length; i++) {
                                var it = (<HTMLInputElement>radios[i]);

                                if (it.value == UIi.elValueTrigger || it.hidden) {
                                    // we have the specific one that is supposed to trigger this action

                                    // first lets get the thing we are gonna trigger

                                    var thetriggeredelement = document.getElementById("div_" + UIi.elIDTarget);

                                    if (it.checked && UIi.elInteractionType == "SHOW") {
                                        // we are gonna make sure something is visible

                                        thetriggeredelement.style.display = "";//"block";
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
                                                thetriggeredelement.style.display = "";// "block";
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
                                    thetriggeredelement.style.display = "";//"block";
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
                                        thetriggeredelement.style.display = "";//"block";
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
                                    thetriggeredelement.style.display = "";//"block";
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
                                        thetriggeredelement.style.display = "";//"block";
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
                                        thetriggeredelement.style.display = "";//"block";
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
                                            thetriggeredelement.style.display = "";//"block";
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
    }

    // use in propigation of UIInteractions on visibiliy checks
    private isVisible(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }
}

class UIElement {
    public elFormRow: number;
    public elID: string;
    public elType: string;
    public elLabel: string;
    public elContent: string[];
    public elRequired: boolean;
    public elInteractions: UIInteraction[];
    public elInitialVisibility: boolean;
    public elStyle: string;
    public elLabelStyle: string;
    public elFormStyle: string;
    public elScore: number[];

    constructor(elformrow: number, elid: string, eltype: string, ellabel: string,
        elcontent: string[], elrequired: boolean,elinteractions: UIInteraction[], elinitialvisibility: boolean, 
        elstyle: string, ellabelstyle: string, elformstyle: string, elscore: number[]) {
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

    }
}

class UIInteraction {
    public elIDSource: string;
    public elIDTarget: string;
    public elInteractionType: string;
    public elValueTrigger: string;

    constructor(elidsource: string, elidtarget: string, elinteractiontype: string, elvaluetrigger: string) {
        this.elIDSource = elidsource;
        this.elIDTarget = elidtarget;
        this.elInteractionType = elinteractiontype;
        this.elValueTrigger = elvaluetrigger;
    }
}

class UIValue {
    public uivID: string;
    public uivValue: string;

    constructor(id: string, value: string) {
        this.uivID = id;
        this.uivValue = value;
    }
}