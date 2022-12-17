import {Document, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import {useEffect, useState} from "react";
import {Card, Col} from "react-bootstrap";

const DownloadPDFComponent = (props) =>{
    const styles = StyleSheet.create({
        page: {
            // flexDirection: 'row',
            // backgroundColor: '#E4E4E4'
        },
        section: {
            fontSize: 12,
            paddingTop: 10,
            paddingLeft:10,
            paddingRight:10,
        },
        section1: {
            fontSize: 16,
            textAlign: "center",
        },
        bor:{
            borderTopWidth:1,
            borderColor:"grey",
            paddingTop: 10,
            paddingBottom: 10,
        }
    });

    const [stud_admissions, setStud_Admissions] = useState([]);
    const [len, setLen] = useState();
    let tmp;

    async function getAdmissionDetails(){
        const response= await fetch("http://localhost:5001/api/view_admissions");
        const data= await response.json();
        setStud_Admissions(data);
        tmp=data
        console.log(tmp)
        setLen(data.length);
    }

    useEffect(() => {
        getAdmissionDetails()
    },[])


    // const FeesReceipt = () => (
    //
    // );

    return(<>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.section1}>Fees Receipt</Text>
                    <Text style={styles.bor}></Text>
                    <Text style={styles.section}>Student Name: {props.name }</Text>
                    <Text style={styles.section}>Student Contact: {props.contact }</Text>
                    <Text style={styles.section}>Domain: {props.domain }</Text>
                    <Text style={styles.section}>Total Amount: {props.totalAmount }</Text>
                    <Text style={styles.section}>Discount Amount: {props.discountAmount }</Text>
                    <Text style={styles.section}>Paid Amount {props.paidAmount }</Text>
                    <Text style={styles.section}>Dues Amount: {props.dueAmount }</Text>
                    <Text style={styles.section}>Dues Payment Date: {props.duePayDate }</Text>
                    <Text style={styles.section}>Remark: {props.remark }</Text>
                    <Text style={styles.bor}></Text>
                </View>
            </Page>
        </Document>

    </>)
}
export default DownloadPDFComponent
