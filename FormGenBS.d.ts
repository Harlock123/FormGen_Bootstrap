export declare class FormGenBS {
    private theUIInteractions;
    private theContainer;
    private theUIElements;
    private theVersionString;
    private JSOBJECTNAME;
    private EnableGreenbar;
    private GreenBarColor;
    private DOINTERACTION;
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
