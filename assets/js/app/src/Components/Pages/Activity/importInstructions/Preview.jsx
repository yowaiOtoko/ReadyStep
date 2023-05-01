import { toHtml } from "hast-util-to-html";
import { SectionTypes } from "../../../../_helper/constants";
import Task from "./Task";

const ActivityGroup = ({ title }) => {
    return <h1>{title}</h1>;
};

const Preview = ({ nodes }) => {


    const mapNode = (node) => {
        const elements = [];
        switch (node.type) {
            case SectionTypes.TEXT:
                return <pre style={{whiteSpace: "pre-wrap"}}>{node.content}</pre>;
            case SectionTypes.TASK:
                return <Task task={node} readOnly/>
            case SectionTypes.TITLE:
                return <h5>{node.content.trim()}</h5>
            default:
                return null;
        }
    };

    const elements = Object.entries(nodes).map(([key, node]) => {
        return mapNode(node);
    });

    if (!nodes) return null;
    return (
        <div
        // dangerouslySetInnerHTML={{__html: toHtml(data)}}
        >
            {elements}
        </div>
    );
};

export default Preview;
