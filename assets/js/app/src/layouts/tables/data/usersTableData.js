import {get} from "utils";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function UsersTable(users) {


    const Author = ({ image, name, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={image} name={name} size="sm" />
        <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
            </MDTypography>
            <MDTypography variant="caption">{email}</MDTypography>
        </MDBox>
        </MDBox>
    );

    const Job = ({ title, description }) => (
        <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {title}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
    );

    return {
        columns: [
        { Header: "author", accessor: "author", width: "45%", align: "left" },
        { Header: "function", accessor: "function", align: "left" },
        { Header: "status", accessor: "status", align: "center" },
        { Header: "employed", accessor: "employed", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
        ],

        rows: users.map(user => {

            return {
                author: <Author image={team2} name={user.name} email="john@creative-tim.com" />,
                function: <Job title="Manager" description="Organization" />,
                status: (
                <MDBox ml={-1}>
                    <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
                </MDBox>
                ),
                employed: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    23/04/18
                </MDTypography>
                ),
                action: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    Edit
                </MDTypography>
                ),
            }
        })
    };

}