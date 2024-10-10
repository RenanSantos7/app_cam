import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { useEffect, useState } from 'react';
import {
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

export default function App() {
	const [image, setImage] = useState('');

	const options: ImagePicker.ImagePickerOptions = {
		mediaTypes: ImagePicker.MediaTypeOptions.All,
		quality: 1,
		selectionLimit: 1,
	};

	async function pickImage() {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			alert('Permissão para acessar a galeria é necessária!');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync(options);

		if (result.canceled) {
			console.log('Image Picker cancelado');
			return;
		} else {
			// console.log(result);
			setImage(result.assets[0].uri);
		}
	}

	async function launchCamera() {
		const permissionResult =
			await ImagePicker.requestCameraPermissionsAsync();

		if (!permissionResult.granted) {
			alert('Permissão para acessar a câmera é necessária!');
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
			selectionLimit: 1,
		});

		if (result.canceled) {
			console.error('Image Picker (Câmera) cancelado');
			return;
		} else {
			// console.log(result);
			const pic = result.assets[0].uri
			setImage(pic);
			savePicture(pic)
		}
	}

	async function savePicture(uri: string) {
		const permission = await MediaLibrary.requestPermissionsAsync();

		if (!permission.granted) {
			alert('Permissão para salvar na galeria é necessária!');
			return;
		}

		try {
			await MediaLibrary.createAssetAsync(uri);
			// alert('Foto salva na galeria com sucesso!');
		} catch (error) {
			console.log(error);
			// alert('Erro ao salvar a foto!');
		}
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='white' barStyle='dark-content' />
			{image && <Image source={{ uri: image }} style={styles.image} />}

			<View style={styles.botoes}>
				<TouchableOpacity
					activeOpacity={0.75}
					style={styles.botao}
					onPress={pickImage}
				>
					<Text style={styles.botaoTxt}>Abrir biblioteca</Text>
				</TouchableOpacity>

				<TouchableOpacity
					activeOpacity={0.75}
					style={styles.botao}
					onPress={launchCamera}
				>
					<Text style={styles.botaoTxt}>Abrir Câmera</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				activeOpacity={0.75}
				style={[styles.botao, styles.perigo]}
				onPress={() => setImage('')}
			>
				<Text style={styles.botaoTxt}>Limpar Imagem</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	botoes: {
		flexDirection: 'row',
		gap: 20,
	},
	botao: {
		padding: 12,
		borderRadius: 8,
		elevation: 2,
		backgroundColor: 'hsl(220, 72%, 50%)',
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	botaoTxt: {
		color: 'white',
		fontWeight: '600',
	},
	image: {
		width: '90%',
		height: 300,
		objectFit: 'cover',
		borderWidth: 2,
		borderColor: '#ccc',
		borderRadius: 8,
		elevation: 2,
	},
	perigo: {
		backgroundColor: 'red',
	},
});
