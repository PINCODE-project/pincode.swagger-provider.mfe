import { PureComponent } from "react";
import { List } from "immutable";
import toString from "lodash/toString";
import { ChevronRight } from "lucide-react";

class OperationSummary extends PureComponent {
    // static propTypes = {
    //     specPath: ImPropTypes.list.isRequired,
    //     operationProps: PropTypes.instanceOf(Iterable).isRequired,
    //     isShown: PropTypes.bool.isRequired,
    //     toggleShown: PropTypes.func.isRequired,
    //     getComponent: PropTypes.func.isRequired,
    //     getConfigs: PropTypes.func.isRequired,
    //     authActions: PropTypes.object,
    //     authSelectors: PropTypes.object,
    // };

    static defaultProps = {
        operationProps: null,
        specPath: List(),
        summary: "",
    };

    override render() {
        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        const { isShown, toggleShown, getComponent, authActions, authSelectors, operationProps, specPath } = this.props;

        const {
            summary,
            isAuthorized,
            method,
            op,
            showSummary,
            path,
            operationId,
            originalOperationId,
            displayOperationId,
            // eslint-disable-next-line react/prop-types
        } = operationProps.toJS();

        const { summary: resolvedSummary } = op;

        // eslint-disable-next-line react/prop-types
        const security = operationProps.get("security");

        const AuthorizeOperationBtn = getComponent("authorizeOperationBtn", true);
        const OperationSummaryMethod = getComponent("OperationSummaryMethod");
        const OperationSummaryPath = getComponent("OperationSummaryPath");
        const JumpToPath = getComponent("JumpToPath", true);
        // const CopyToClipboardBtn = getComponent("CopyToClipboardBtn", true);
        // const ArrowUpIcon = getComponent("ArrowUpIcon");
        // const ArrowDownIcon = getComponent("ArrowDownIcon");

        const hasSecurity = security && !!security.count();
        const securityIsOptional = hasSecurity && security.size === 1 && security.first().isEmpty();
        const allowAnonymous = !hasSecurity || securityIsOptional;

        return (
            <div className={`opblock-summary opblock-summary-${method}`}>
                <button aria-expanded={isShown} className="opblock-summary-control" onClick={toggleShown}>
                    <OperationSummaryMethod method={method} />
                    <div className="opblock-summary-path-description-wrapper">
                        <OperationSummaryPath
                            getComponent={getComponent}
                            operationProps={operationProps}
                            specPath={specPath}
                        />

                        {!showSummary ? null : (
                            <div className="opblock-summary-description">{toString(resolvedSummary || summary)}</div>
                        )}
                    </div>

                    {displayOperationId && (originalOperationId || operationId) ? (
                        <span className="opblock-summary-operation-id">{originalOperationId || operationId}</span>
                    ) : null}
                </button>
                {/* eslint-disable-next-line react/prop-types */}
                {/* <CopyToClipboardBtn textToCopy={`${specPath.get(1)}`} /> */}
                {allowAnonymous ? null : (
                    <AuthorizeOperationBtn
                        isAuthorized={isAuthorized}
                        onClick={() => {
                            // eslint-disable-next-line react/prop-types
                            const applicableDefinitions = authSelectors.definitionsForRequirements(security);
                            // eslint-disable-next-line react/prop-types
                            authActions.showDefinitions(applicableDefinitions);
                        }}
                    />
                )}
                <JumpToPath path={specPath} />
                {/* TODO: use wrapComponents here, swagger-ui doesn't care about jumpToPath */}
                <button
                    aria-label={`${method} ${path.replace(/\//g, "\u200b/")}`}
                    className="opblock-control-arrow"
                    aria-expanded={isShown}
                    // @ts-ignore
                    tabIndex="-1"
                    onClick={toggleShown}
                >
                    <ChevronRight data-open={isShown} className="arrow data-[open=true]:rotate-90" />
                </button>
            </div>
        );
    }
}

const OperationSummaryPlugin = () => ({
    components: {
        OperationSummary,
    },
});

export default OperationSummaryPlugin;
