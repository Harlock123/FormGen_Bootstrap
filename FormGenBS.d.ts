export declare class FormGenBS {
    private theUIInteractions;
    private theContainer;
    private theUIElements;
    private theVersionString;
    private JSOBJECTNAME;
    private EnableGreenbar;
    private GreenBarColor;
    private DOINTERACTION;
    private AllowInteractions;
    private TheInputIDs;
    constructor(DomElementID: string, UIElements: UIElement[], VersionString: string, JSobjectName: string);
    private HydrateForm;
    /**
     * GetFormData
     *
     * @returns UIValue[] of the forms current answers to the question elements on the current form
     */
    GetFormData(): UIValue[];
    /**
     * GetFormDataAsString
     *
     * @returns JSON.Stringify() result of the GetFormData() method.
     */
    GetFormDataAsString(): string;
    /**
     * GetFormDefinition
     *
     * @returns a UIElement[] of the forms current content for its definition.
     */
    GetFormDefinition(): UIElement[];
    /**
     * GetFormDefinitionAsString
     * Returns the JSON.Stringify() result of the GetFormDefinition() call.
     * Used to save a forms definition elsewhere so it can restored with a call to SetFormDefinition().
     *
     * @returns JSON.Stringify() array of UIElements
     */
    GetFormDefinitionAsString(): string;
    /**
     * SetFormDefinition
     * @param TheFormDefinitionAsString: string
     *
     * Takes a JSON.Stringify result of the GetFormDefinition() call and rehydrates the form to restore its content.
     */
    SetFormDefinition(TheFormDefinitionAsString: string): void;
    /**
     * SetFormDefinitionFromObject
     * @param UIElementArray: UIElement[]
     *
     * Takes an array of UUElements and applys that to the forms definition overwriting the existing forms definition
     */
    SetFormDefinitionFromObject(UIElementArray: UIElement[]): void;
    /**
     * GetFormDefinitionFrom
     * @param webUrl: string
     * Attempts to do a simple GET from the supplied URL to fetch the definition for a form as a JSON.Stringify()
     * result of an array of UIElements. Used to fetch forms definition from webservice endpoints.
    */
    GetFormDefinitionFrom(webUrl: string): void;
    /**
     * GetRoAtYCoordinate
     * @param YCord
     */
    GetRowAtYCoordinate(YCord: number): number;
    /**
     * SetFormData
     *  @param UIValues: UIValue[]
     */
    SetFormData(UIValues: UIValue[]): void;
    /**
     * SetFormVersion
     * @param versionstring: string
     */
    SetFormVersion(versionstring: string): void;
    /**
     * GetFormVersion
     */
    GetFormVersion(): string;
    /**
     * SetFormDataFromString
     *  @param theString: string
     *
     * Takes a JSON serialization (Stringify) of an array of UIValue elements and attempts to apply
     * the vakues to the current form. Used to restore a forms entries gathered by a call to
     * GetFormDataAsString()
     */
    SetFormDataFromString(theString: string): void;
    /**
     * GetFormScore
     *
     * Walks the forms content and for elements that had a weight to be applied to them in the SCORE Array for the element will
     * calculate the SUM score
     *
     * @return score as a number.
     */
    GetFormScore(): number;
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
    IsFormValid(): boolean;
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
    GetWholeForm(): string;
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
    SetWholeForm(TheFormDefCon: string): void;
    /**
     * ClearFormValidityVisuals
     *
     * Will clear the elemet validity cue's applied tothe forms visuals by IsFormValid()
     */
    ClearFormValidityVisuals(): void;
    /**
     * DoFormGenInteraction
     * @param e HtmlElement that triggered the event or empty string
     *
     * Walks the interaction tree and engages all interaction logic based on values entered into the current form
     */
    private DoFormGenInteraction;
    /**
     * SetReadWrite()
     * @param RW True or False will enumerate the form and set the appropriate attributes for RW
     */
    SetReadWrite(RW: boolean): void;
    /**
     * GreenBarEnabled()
     * Turns on the automatic alternate coloring scheme for renderd rows. The default color LightGreen
     * can be changed by using SetGreenBarColor()
     */
    GreenBarEnabled(): void;
    /**
     * GreenBarDisabled()
     * Turns off the automatic alternate coloring scheme for renderd rows.
     */
    GreenBarDisabled(): void;
    /**
     * SetGreenBarColor()
     * @param TheColor a string representation of the color to employ for the greenbar coloration. HTML compatable string representation of the color
     *
     */
    SetGreenBarColor(TheColor: string): void;
    private isVisible;
}
export declare class UIElement {
    elFormRow: number;
    elID: string;
    elType: string;
    elLabel: string;
    elContent: string[];
    elRequired: boolean;
    elInteractions: UIInteraction[];
    elInitialVisibility: boolean;
    elStyle: string;
    elLabelStyle: string;
    elFormStyle: string;
    elScore: number[];
    elAutoSize: boolean;
    elCustomClass: string;
    constructor(elformrow: number, elid: string, eltype: string, ellabel: string, elcontent: string[], elrequired: boolean, elinteractions: UIInteraction[], elinitialvisibility: boolean, elstyle: string, ellabelstyle: string, elformstyle: string, elscore: number[], elautosize?: boolean, elcustomclass?: string);
}
export declare class UIInteraction {
    elIDSource: string;
    elIDTarget: string;
    elInteractionType: string;
    elValueTrigger: string;
    constructor(elidsource: string, elidtarget: string, elinteractiontype: string, elvaluetrigger: string);
}
export declare class UIValue {
    uivID: string;
    uivValue: string;
    constructor(id: string, value: string);
}
export declare class FormGenDefCon {
    FGDFDefinition: string;
    FGDFContent: string;
    constructor(FGDFD: string, FGDFC: string);
}
