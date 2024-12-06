import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';

const data = [
  {label: 'BA', value: 'BA'},
  {label: 'Development', value: 'Development'},
  {label: 'Designing', value: 'Designing'},
  {label: 'UI', value: 'UI'},
  {label: 'Testing', value: 'Testing'},
  {label: 'HR', value: 'HR'},
  {label: 'Manager', value: 'Manager'},
  {label: 'System Admin', value: 'System Admin'},
];
const admin = [
  {label: 'True', value: 'true'},
  {label: 'False', value: 'false'},
];
const AddEmployee = () => {
  const [employeeId,setEmployeeId] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [companyMail, setCompanyMail] = useState('');
  const [phone,setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');

  const handelSubmit =async () =>{
    try{
      const response = await axios.post(
        'https://backend-api-social.vercel.app/api/emp/add',
        {
          employeeId,
          firstName,
          lastName,
          companyMail,
          department,
          phone,
          password,
          isAdmin
        },
      )
      setEmployeeId('');
      setFirstName('');
      setLastName('');
      setCompanyMail('');
      setPhone('');
      setDepartment('');
      setPassword('');
      setIsAdmin('');
      Alert.alert('Employee Added Succesfullys')
    console.log('Employee Registered Succesfully', response.data);

    }catch(error){
      console.error('Signup failed:', error);
    }
  }
  return (
    <SafeAreaView style={{backgroundColor:'#e7f2fd'}}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add Employee</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Employee Id:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your new employeeId"
              placeholderTextColor="gray"
              value={employeeId}
              onChangeText={setEmployeeId}
            />
          </View>
          <View style={[styles.inputGroup, styles.nameContainer]}>
            <View style={styles.halfWidthInputGroup}>
              <Text style={styles.label}>First Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Jhon"
                placeholderTextColor="gray"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.halfWidthInputGroup}>
              <Text style={styles.label}>Last Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Doe"
                placeholderTextColor="gray"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Office Mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your office mail"
              placeholderTextColor="gray"
              value={companyMail}
              onChangeText={setCompanyMail}
            />
          </View>
          <View
            style={[
              styles.inputGroup,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={[styles.label, {width: 120}]}>Department:</Text>
            <Dropdown
              data={data}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Select department"
              value={department}
              onChange={item => {
                setDepartment(item.value);
              }}
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              containerStyle={styles.dropdownContainer}
              itemTextStyle={styles.itemTextStyle}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Phone number"
              placeholderTextColor="gray"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{marginBottom: 5, fontSize: 18}}>Password:</Text>
            <View
              style={{
                borderBottomWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  width: '90%',
                  fontSize: 18,
                }}
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}>
                <Image
                  style={{width: 25, height: 25}}
                  source={
                    passwordVisible
                      ? require('../../assets/Eye.png')
                      : require('../../assets/Eyeoff.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.inputGroup,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={[styles.label, {width: 100}]}>Admin:</Text>
            <Dropdown
              data={admin}
              maxHeight={70}
              labelField="label"
              valueField="value"
              placeholder="Select department"
              value={isAdmin}
              onChange={item => {
                setIsAdmin(item.value);
              }}
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              containerStyle={styles.dropdownContainer}
              itemTextStyle={styles.itemTextStyle}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#4070f4',
              alignItems: 'center',
              padding: 20,
              borderRadius: 50,
            }}
            onPress={handelSubmit}>
            <Text style={{color: 'white', fontSize: 18}}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidthInputGroup: {
    width: '48%',
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    fontSize: 18,
    height: 40,
    color: '#333',
  },
  dropdown: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 50,
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#333',
  },
  placeholderStyle: {
    fontSize: 18,
    color: 'gray',
  },
  dropdownContainer: {
    borderBottomWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  itemTextStyle: {
    fontSize: 18,
    padding: 10,
    color: '#333',
  },
});

export default AddEmployee;
