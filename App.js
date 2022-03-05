import { useState } from 'react';
import { StyleSheet, Platform, Text, View, Alert, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ScrollView  } from 'react-native';
import Task from './components/Task';

export default function App() {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);

	const handleAddTask = () => {
		Keyboard.dismiss();
		if(task !== "" && task !== null) {
			setTaskItems([...taskItems, task])
			setTask(null);
		} else showAlert("New Task", "Please write a task");
	}

	const completeTask = (index) => {
		showAlert("Complete Task", "Are you sure to complete this Task", () => completeTaskAction(index));
	}

	const completeTaskAction = (index) => {
		console.log(index)
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy)
	}

	const showAlert = (title, msg, callback=null) => {
		let actions = [{ text: "OK", onPress: () => console.log("ok")}];

		if(typeof callback == 'function') {
			actions = [
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "OK", onPress: callback }
			]
		}
		return Alert.alert(
			title,
			msg,
			actions
		);
	}

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={{
				flexGrow: 1
				}}
				keyboardShouldPersistTaps='handled'
			>
				<View style={styles.tasksWrapper}>
					<Text style={styles.sectionTitle}>Today's tasks</Text>
					<View style={styles.item}>
						{taskItems.map((task, index) => {
								return (<TouchableOpacity key={index} onPress={() => completeTask(index)}>
									<Task text={task}/>
								</TouchableOpacity>)
							}
						)}
					</View>
				</View>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.writeTaskWrapper}
					>
					<TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text=>setTask(text)}/>

					<TouchableOpacity onPress={() => handleAddTask()}>
						<View style={styles.addWrapper}>
							<Text style={styles.addText}>+</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E8EAED',
	},
	tasksWrapper: {
		paddingTop: 80,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: 'bold'
	},
	items: {
		marginTop: 30,
	},
	writeTaskWrapper: {
		position: 'absolute',
		bottom: 60,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: '#FFF',
		borderRadius: 60,
		borderColor: '#C0C0C0',
		borderWidth: 1,
		width: 250,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: '#FFF',
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#C0C0C0',
		borderWidth: 1,
	},
	addText: {},
});
