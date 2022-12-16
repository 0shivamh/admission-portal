import {Document, Page, StyleSheet, Text, View} from "@react-pdf/renderer";
import {useEffect, useState} from "react";
import {Card, Col} from "react-bootstrap";

const DownloadPDFComponent = () =>{
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            fontSize: 11,
            paddingTop: 30,
            paddingLeft:60,
            paddingRight:60,
            lineHeight: 1.5,
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

                    {stud_admissions.map((e) => (
                        <Text style={styles.section}>Section # {e.name }</Text>
                    ))}

                </View>
            </Page>
        </Document>

    </>)
}
export default DownloadPDFComponent
