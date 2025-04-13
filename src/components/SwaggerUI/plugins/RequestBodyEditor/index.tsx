import { PureComponent } from "react";

const NOOP = Function.prototype;

type Props = {
    onChange: (...args: any) => void;
    getComponent: () => void;
    value: string;
    defaultValue: string;
    errors: Array<any>;
};

class RequestBodyEditor extends PureComponent {
    static defaultProps = {
        onChange: NOOP,
        userHasEditedBody: false,
    };

    constructor(props: Props, context: any) {
        // @ts-ignore
        super(props, context);

        this.state = {
            // eslint-disable-next-line react/prop-types
            value: JSON.stringify(props.value) || props.defaultValue,
        };

        // this is the glue that makes sure our initial value gets set as the
        // current request body value
        // TODO: achieve this in a selector instead
        // eslint-disable-next-line react/prop-types
        props.onChange(props.value);
    }

    applyDefaultValue = (nextProps: any) => {
        const { onChange, defaultValue } = nextProps || this.props;

        this.setState({
            value: defaultValue,
        });

        return onChange(defaultValue);
    };

    onChange = (value: any) => {
        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        this.props.onChange(JSON.stringify(value));
    };

    onDomChange = (e: any) => {
        const inputValue = e.target.value;

        this.setState(
            {
                value: inputValue,
            },
            () => this.onChange(inputValue),
        );
    };

    UNSAFE_componentWillReceiveProps(nextProps: any) {
        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        if (this.props.value !== nextProps.value && nextProps.value !== this.state.value) {
            this.setState({
                // eslint-disable-next-line react/prop-types
                value: JSON.stringify(nextProps.value),
            });
        }

        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        if (!nextProps.value && nextProps.defaultValue && !!this.state.value) {
            // if new value is falsy, we have a default, AND the falsy value didn't
            // come from us originally
            this.applyDefaultValue(nextProps);
        }
    }

    render() {
        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        const { getComponent, errors } = this.props;
        // @ts-ignore
        const { value } = this.state;

        // eslint-disable-next-line react/prop-types
        const isInvalid = errors.size > 0;
        const TextArea = getComponent("TextArea");

        return (
            <div className="body-param">
                <TextArea
                    className={`body-param__text ${isInvalid ? "invalid" : ""}`}
                    // eslint-disable-next-line react/prop-types
                    title={errors.size ? errors.join(", ") : ""}
                    value={value}
                    onChange={this.onDomChange}
                />
            </div>
        );
    }
}

const RequestBodyEditorPlugin = () => ({
    components: {
        RequestBodyEditor,
    },
});

export default RequestBodyEditorPlugin;
