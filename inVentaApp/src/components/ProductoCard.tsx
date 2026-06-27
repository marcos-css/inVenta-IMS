import { View, Text, StyleSheet } from "react-native";
import { Producto } from "../types";
import { Colors } from "../constants/colors";

interface Props {
    producto: Producto;
}

export default function ProductoCard({ producto }: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardText}>
                <Text style={styles.productName}>{producto.nombre}</Text>
                {!!producto.marca && <Text style={styles.productBrand}>{producto.marca}</Text>}
            </View>
            <Text style={styles.productPrice}>${producto.precio.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        padding: 16,
        borderRadius: 12,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText:{
        flex: 1,
        paddingRight: 12,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    productBrand:{
        fontSize: 13,
        color: Colors.textMuted,
        marginTop: 4,
    },
    productPrice:{
        fontSize: 18,
        fontWeight: '700',
        color: Colors.black,
    }
})