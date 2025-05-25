import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./swagger.scss";
import OperationSummaryPlugin from "@components/SwaggerUI/plugins/OperationSummary";
import RequestBodyEditorPlugin from "@components/SwaggerUI/plugins/RequestBodyEditor";
import { $microservice, getMicroserviceFx } from "@store/microservice/get-microservice.ts";
import { useUnit } from "effector-react";
import Loader from "@components/Loader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MicroserviceSchemePage = () => {
    const { microserviceId } = useParams();
    const microservice = useUnit($microservice);
    const [getMicroservice, isLoadingMicroservice] = useUnit([getMicroserviceFx, getMicroserviceFx.pending]);

    useEffect(() => {
        getMicroservice(microserviceId ?? "");
    }, [getMicroservice, microserviceId]);

    if (isLoadingMicroservice) {
        return <Loader />;
    }

    return (
        <SwaggerUI
            // filter={true}
            spec={microservice?.content}
            // requestSnippetsEnabled={true}
            // requestSnippets={{
            //     generators: {
            //         curl_bash: {
            //             title: "cURL (bash)",
            //             syntax: "bash",
            //         },
            //         curl_powershell: {
            //             title: "cURL (PowerShell)",
            //             syntax: "powershell",
            //         },
            //         curl_cmd: {
            //             title: "cURL (CMD)",
            //             syntax: "bash",
            //         },
            //     },
            //     defaultExpanded: true,
            //     languages: null,
            // }}
            plugins={[
                // () => ({
                //     wrapComponents: {
                //         OperationSummaryPath: (Original: any) =>
                //             function AF(props: any) {
                //                 return (
                //                     <span style={{ display: "flex" }}>
                //                         Солнце
                //                         <Original
                //                             {...{
                //                                 ...props,
                //                                 specPath: { ...props.specPath, _tail: ["paths", "hui", "post"] },
                //                             }}
                //                         />
                //                     </span>
                //                 );
                //             },
                //     },
                // }),
                // (system: any) => ({
                //     components: {
                //         OperationSummaryMethod: (props: any) => {
                //             console.log("daw", system, "daw,", props);
                //             return <div>Здесь метод: {props.method}</div>;
                //         },
                //         Logo: () => {
                //             return <div>LOGO</div>;
                //         },
                //         OptionControlArrow: (props: any) => {
                //             console.log("collapse", props);
                //             return <div>Collapse</div>;
                //         },
                //     },
                // }),
                OperationSummaryPlugin,
                RequestBodyEditorPlugin,
            ]}
        />
    );
};

export default MicroserviceSchemePage;
