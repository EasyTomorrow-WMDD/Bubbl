import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import supabase from '../services/supabase';

const AddProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profile_type } = route.params;

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validate = () => {
    let valid = true;
    if (!nickname.trim()) {
      setNicknameError('User nickname is required');
      valid = false;
    } else {
      setNicknameError('');
    }
    return valid;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) return;

    const { data: userData } = await supabase
      .from('user')
      .select('account_id')
      .eq('user_auth_id', user.id)
      .single();

    if (!userData) return;

    const { error } = await supabase.from('user').insert({
      user_auth_id: null,
      account_id: userData.account_id,
      user_access_type: 'sub',
      user_type: profile_type,
      user_nickname: nickname,
      user_dob: dob,
      avatar_id: null,
    });

    if (error) {
      Alert.alert('Error', 'Failed to create profile.');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {profile_type === 'parent' ? 'Add parent profile' : 'Add child profile'}
      </Text>

      <Text style={styles.label}>Your nickname</Text>
      <TextInput
        style={[styles.input, nicknameError ? styles.inputError : null]}
        placeholder="Enter your nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      {nicknameError ? <Text style={styles.errorText}>{nicknameError}</Text> : null}

      <Text style={styles.label}>Your birth date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{dob ? dob.toDateString() : 'Select birth date'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      <Button title="Create profile" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default AddProfile;
