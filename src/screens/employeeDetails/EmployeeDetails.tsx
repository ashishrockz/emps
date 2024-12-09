import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../models/types';

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  status: string;
}

const EmployeeDetails = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'EmployeeDetails'>;
}) => {
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `https://backend-api-social.vercel.app/api/emp/${employeeId}`,
        );
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeDetails();
  }, [employeeId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {employee ? (
        <>
          <Text style={styles.detail}>Employee ID: {employee.employeeId}</Text>
          <Text style={styles.detail}>First Name: {employee.firstName}</Text>
          <Text style={styles.detail}>Last Name: {employee.lastName}</Text>
          <Text style={styles.detail}>Status: {employee.status}</Text>
        </>
      ) : (
        <Text>No details available for this employee.</Text>
      )}
    </View>
  );
};

export default EmployeeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  detail: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '500',
  },
});
