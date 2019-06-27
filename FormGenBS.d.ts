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
     */
    GetFormData(): UIValue[];
    /**
     * GetFormDataAsString
     */
    GetFormDataAsString(): string;
    /**
     * GetFormDataAsString
     */
    GetFormDefinition(): UIElement[];
    /**
     * GetFormDataAsString
     */
    GetFormDefinitionAsString(): string;
    /**
     * GetFormDataAsString
     * TheFormDefinitionAsString: string
     */
    SetFormDefinition(TheFormDefinitionAsString: string): void;
    /**
     * GetFormDataAsString
     * UIElementArray: UIElement[]
     */
    SetFormDefinitionFromObject(UIElementArray: UIElement[]): void;
    /**
     * GetFormDefinitionFrom
     * webUrl: string
    */
    GetFormDefinitionFrom(webUrl: string): void;
    /**
     * GetRoAtYCoordinate
     * @param YCord
     */
    GetRowAtYCoordinate(YCord: number): number;
    /**
     * SetFormData
     *  UIValues: UIValue[]
     */
    SetFormData(UIValues: UIValue[]): void;
    /**
     * SetFormVersion
     * versionstring: string
     */
    SetFormVersion(versionstring: string): void;
    /**
     * GetFormVersion
     */
    GetFormVersion(): string;
    /**
     * SetFormDataFromString
     *  theString: string
     */
    SetFormDataFromString(theString: string): void;
    /**
     * GetFormScore
     */
    GetFormScore(): number;
    /**
     * IsFormValid
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
     */
    ClearFormValidityVisuals(): void;
    /**
     * DoFormGenInteraction
     */
    private DoFormGenInteraction;
    /**
     * SetReadWrite()
     * @param RW True or False will enumerate the form and set the appropriate attributes for RW
     */
    SetReadWrite(RW: boolean): void;
    GreenBarEnabled(): void;
    GreenBarDisabled(): void;
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
