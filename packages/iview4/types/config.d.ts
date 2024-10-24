import {FormData, VNodeRule} from "@form-create/core";
import {Col, Row, Tooltip, Poptip, Button, Form, FormItem} from "view-design";
import {Api} from "./index";

export interface OptionAttrs {
    col?: Boolean | Partial<Col & {
        labelWidth?: number | string;
        show?: Boolean;
    }>;
    row?: Boolean | Partial<Row & {
        show?: Boolean;
    }>;
    info?: Boolean | Partial<(Tooltip | Poptip) & VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        icon?: string;
        align?: 'left' | 'right';
        info?: string;
    }>;
    wrap?: Boolean | Partial<VNodeRule & {
        labelWidth?: number;
        labelFor?: string;
        required?: boolean;
        error?: string;
        showMessage?: boolean;
        show?: Boolean;
    }>;
    form?: Partial<{
        inline?: boolean;
        labelPosition?: 'left' | 'right' | 'top';
        labelWidth?: number;
        showMessage?: boolean;
        className?: any;
        col?: Boolean;
    }>;

    submitBtn?: Boolean | Partial<Button & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    }>;

    resetBtn?: Boolean | Partial<Button & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    }>;

}

declare const optionAttrs: Partial<OptionAttrs & {
    title?: Boolean | Partial<VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        title?: string;
    }>;
}>;

export interface CreatorAttrs {
    col(props: typeof optionAttrs.col): this;

    wrap(props: typeof optionAttrs.wrap): this;

    title(props: string | typeof optionAttrs.title): this;

    info(props: string | typeof optionAttrs.info): this;

    className(prop: string): this;

}

export interface RuleAttrs {
    col?: typeof optionAttrs.col;
    wrap?: typeof optionAttrs.wrap;
    title?: string | typeof optionAttrs.title;
    info?: string | typeof optionAttrs.info;
    className?: string;
}

export interface ApiAttrs {
    btn: {
        loading(loading: boolean): void;
        disabled(disabled: boolean): void;
        show(show: boolean): void;
    }
    resetBtn: {
        loading(loading: boolean): void;
        disabled(disabled: boolean): void;
        show(show: boolean): void;
    }

    formEl(): undefined | Form;

    wrapEl(id: string): undefined | FormItem;

    submit(success: (formData: FormData, $f: Api) => void, fail: ($f: Api) => void): void;

    clearValidateState(fields?: string | string[], clearSub?: Boolean): void;

    clearSubValidateState(fields?: string | string[]): void;

    validate(callback?: (valid?: boolean) => void): Promise<any>;

    validateField(field: string, callback?: (valid?: boolean) => void): Promise<any>;

    submitBtnProps(props: Button): void;

    resetBtnProps(props: Button): void;

}
