import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import React from "react";

interface MealDetailPDFProps {
    title: string,
    image: string,
    description: string,
    video: string
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '0 32px'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#000',
        paddingBottom: 16,
        textDecoration: 'underline'
    },
    imageContainer: {},
    coverImage: {
        width: 200,
        margin: '0 auto',
        height: 'auto',
        borderRadius: '5px'
    },
    description: {
        paddingTop: 16,
        color: '#000',
        fontSize: 12,
        lineHeight: '2px',
    }
});

export const MealDetailPDF: React.FC<MealDetailPDFProps> = ({image, description, title, video}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Image style={styles.coverImage} src={image}/>
                <Text style={styles.description}>{description}</Text>
            </View>
        </Page>
    </Document>
);