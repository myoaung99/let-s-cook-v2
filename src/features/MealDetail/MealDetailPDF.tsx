import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import React from "react";
import {Measurement} from "@/features/MealDetail/MealIngredients";

interface MealDetailPDFProps {
    title: string,
    image: string,
    description: string,
    ingredients: Array<Measurement> | undefined | null
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '32px'
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
    subTitle: {
        fontSize: '14px',
        color: '#000',
        paddingBottom: 16,
    },
    imageContainer: {
        marginBottom: '20px'
    },
    coverImage: {
        width: '50%',
        margin: '0 auto',
        height: 'auto',
        aspectRatio: 1,
        borderRadius: '5px'
    },
    description: {
        paddingTop: 16,
        color: '#000',
        fontSize: 12,
        lineHeight: '2px',
    },
    mealItemBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        marginBottom: '5px'
    },
    textSm: {
        fontSize: '12px',
    }
});

export const MealDetailPDF: React.FC<MealDetailPDFProps> = ({image, description, title, ingredients}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.coverImage} src={image}/>
            </View>
            <View style={styles.section}>
                <Text style={styles.subTitle}>
                    Ingredients
                </Text>
                {
                    ingredients?.map((measurement) => (
                        <View
                            key={measurement.sequence}
                            style={styles.mealItemBox}>
                            <Text style={styles.textSm}>{measurement.name} :</Text>
                            <Text style={styles.textSm}>{measurement.measure}</Text>
                        </View>
                    ))
                }
            </View>
            <View style={styles.section}>
                <Text style={styles.subTitle}>
                    Instructions
                </Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </Page>
    </Document>
);