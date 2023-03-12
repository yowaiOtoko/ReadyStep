import { useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import reactStringReplace from "react-string-replace";
import {SectionTypes} from "../../../../_helper/constants";
import { ckTransform } from "../../../../_helper/ckEditorUtils";

// const select = (e) => {
//     const selection = window.getSelection();
//     selection.selectAllChildren(e.target);

// };

const onMouseUp = (e, setTarget) => {
    // var span = document.createElement("span");

    const getSelectionDirection = (sel) => {
        if (sel.anchorNode == sel.focusNode) {
            if (sel.anchorOffset > sel.focusOffset) {
                return true;
            }
        } else if (
            sel.anchorNode.compareDocumentPosition(sel.focusNode) ==
            Node.DOCUMENT_POSITION_PRECEDING
        ) {
            return true;
        }
        return false;
    };

    if (window.getSelection) {
        var sel = window.getSelection();

        if(sel.isCollapsed){return}

        const isBackwardSelection = getSelectionDirection(sel);
        console.log(isBackwardSelection ? "backward" : "forward");
        const getClosestElement = (node, selector) => {
            //check if node is an element
            if (node.nodeType === 1) {
                if (node.matches(selector)) {
                    return node;
                }
            } else {
                if (
                    node.nextElementSibling &&
                    node.nextElementSibling.matches(selector)
                ) {
                    return node.nextElementSibling;
                }
                if (node.parentElement.matches(selector)) {
                    return node.parentElement;
                }
            }
        };
        const focusNode = getClosestElement(
            sel.focusNode,
            "[id^='tooltip-target']"
        );
        const anchorNode = getClosestElement(
            sel.anchorNode,
            "[id^='tooltip-target']"
        );

        if (isBackwardSelection) {
            sel.setBaseAndExtent(focusNode, 0, anchorNode, anchorNode.childNodes?.length ? 1 : 0);
        } else {
            console.log(focusNode);
            sel.setBaseAndExtent(
                anchorNode,
                0,
                focusNode,
                focusNode.childNodes?.length ? 1 : 0
            );
        }
        const id = isBackwardSelection ? sel.focusNode.id : sel.anchorNode.id;
        //sel.selectAllChildren(e.target)
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();

            if (id && id.startsWith("tooltip-target")) {
                setTarget(id);
            }
            //range.surroundContents(span);
            // sel.removeAllRanges();
            // sel.addRange(range);
            console.log(id, anchorNode, focusNode);
        }
    }
};

//get all nodes between anchor and focus
const getNodesBetween = (anchorNode, focusNode) => {
    const nodes = [];
    let node = anchorNode;
    while (node) {

        if (node.nodeType === 1 && node.matches("[id^='tooltip-target']")) {
            nodes.push(node);
        }

        if (node === focusNode) {
            break;
        }
        node = node.nextSibling;
    }
    return nodes;
};

const highlightSelection = (anchorNode, focusNode, type) => {

    getNodesBetween(anchorNode, focusNode).forEach((node) => {
        //add css class to node
        node.classList.remove("selected-section");
        node.classList.add("selected-section");
        ['text', 'task', 'task-group','title'].forEach((t) => {
            node.classList.remove(`section-${t}-background-color`);
        });

        node.classList.add(`section-${type}-background-color`);
    });
}



const TextSelector = ({ text, nodes, setNodes }) => {
    const [target, setTarget] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(true);

    const onSectionAdded = (e, id, type) => {

        const sel = window.getSelection();
        const doFormat = [SectionTypes.TASK, SectionTypes.TEXT].indexOf(type) > -1;
        console.log(doFormat)
        const content = doFormat ? ckTransform(sel.toString()) : sel.toString();

        console.log("'"+content+"'")

        setNodes({ ...nodes, [id]: {
            content: content,
            type,
            startIndex: sel.anchorNode.getAttribute("data-index"),
            endIndex: sel.focusNode.getAttribute("data-index")
        } });

        highlightSelection(sel.anchorNode, sel.focusNode, type);

        const a = { ...nodes, [id]: {
            content: window.getSelection().toString(),
            type,
            startIndex: sel.anchorNode.getAttribute("data-index"),
            endIndex: sel.focusNode.getAttribute("data-index")
        } };

        console.log(a)
    };

    const popover = (id) => (
        <Popover className="new-section-action-popover">

            <Popover.Body>
                <Button className="section-text-background-color" onClick={(e) => onSectionAdded(e, id, SectionTypes.TEXT)}>
                    <i className="fa fa-file-text-o"></i>{" "}
                </Button>
                <Button className="section-task-background-color"  onClick={(e) => onSectionAdded(e, id, SectionTypes.TASK)}>
                    <i className="fa fa-list-ol"></i>{" "}
                </Button>
                <Button className="section-title-background-color"  onClick={(e) => onSectionAdded(e, id, SectionTypes.TITLE)}>
                    <i className=""></i>T{" "}
                </Button>
            </Popover.Body>
        </Popover>
    );

    const show = (currentTarget) => currentTarget == target;

    const onToggle = (e) => {
        // console.log(e)
    };

    const a = reactStringReplace(text, /(.*|\n)/g, (match, i) => {
        const id = `tooltip-target-${i}`;
        return (
            <OverlayTrigger
                key={id}
                trigger="hover|focus"
                show={show(id)}
                placement="top"
                onToggle={onToggle}
                overlay={popover(id)}
            >
                <span key={i} id={id} data-index={i}>
                    {match}
                </span>
            </OverlayTrigger>
        );
    });

    return (
        <>
            {/* <pre ref={ref}
                id="text-selector"
                dangerouslySetInnerHTML={{ __html: text }}
            ></pre> */}

            <pre id="text-selector" onMouseUp={(e) => onMouseUp(e, setTarget)}>
                {a}
            </pre>
        </>
    );
};

export default TextSelector;
