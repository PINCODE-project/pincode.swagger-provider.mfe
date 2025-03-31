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

    constructor(props: Props, context) {
        super(props, context);

        this.state = {
            value: JSON.stringify(props.value) || props.defaultValue,
        };

        // this is the glue that makes sure our initial value gets set as the
        // current request body value
        // TODO: achieve this in a selector instead
        props.onChange(props.value);
    }

    applyDefaultValue = (nextProps) => {
        const { onChange, defaultValue } = nextProps || this.props;

        this.setState({
            value: defaultValue,
        });

        return onChange(defaultValue);
    };

    onChange = (value) => {
        this.props.onChange(JSON.stringify(value));
    };

    onDomChange = (e) => {
        const inputValue = e.target.value;

        this.setState(
            {
                value: inputValue,
            },
            () => this.onChange(inputValue),
        );
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value && nextProps.value !== this.state.value) {
            this.setState({
                value: JSON.stringify(nextProps.value),
            });
        }

        if (!nextProps.value && nextProps.defaultValue && !!this.state.value) {
            // if new value is falsy, we have a default, AND the falsy value didn't
            // come from us originally
            this.applyDefaultValue(nextProps);
        }
    }

    render() {
        const { getComponent, errors } = this.props;

        const { value } = this.state;

        const isInvalid = errors.size > 0;
        const TextArea = getComponent("TextArea");

        return (
            <div className="body-param">
                <TextArea
                    className={`body-param__text ${isInvalid ? "invalid" : ""}`}
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
