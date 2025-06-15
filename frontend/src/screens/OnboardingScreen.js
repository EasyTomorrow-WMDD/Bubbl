import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import supabase from '../services/supabase';

export default function OnboardingScreen({ navigation }) {

  // State variables for form inputs
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userType, setUserType] = useState('parent');
  const [isCreatingAccount, setIsCreatingAccount] = useState(true);
  const [accountName, setAccountName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [errors, setErrors] = useState({});

  const [userAuthId, setUserAuthId] = useState(null);

  // Helper function to generate a random 10-character invitation code
  const generateInviteCode = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  // Fetch user auth ID on component mount
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user?.id) {
        Alert.alert('Error', 'Could not get user info.');
        return;
      }
      setUserAuthId(data.user.id);
    })();
  }, []);

  // Validate inputs and submit form
  const validateAndSubmit = async () => {
    const newErrors = {};
    if (!nickname.trim()) newErrors.nickname = 'User nickname is required';
    if (isCreatingAccount && !accountName.trim()) newErrors.accountName = 'Account name is required';
    if (!isCreatingAccount && !invitationCode.trim()) newErrors.invitationCode = 'Invitation code is required. Please contact the account owner.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (isCreatingAccount) {

      let accountData = null;
      let accountError = null;
      let attempt = 0;

      while (attempt < 5 && !accountData) {
        const invitation = generateInviteCode(); // Generate a new invitation code
        console.log(`Attempt ${attempt + 1}: Generated invitation code: ${invitation}`);

        const { data, error } = await supabase
          .from('account')
          .insert({
            account_name: accountName,
            account_invitation: invitation,
          })
          .select()
          .single();

        if (!error) {
          accountData = data;
          break;
        }

        if (error.code === '23505') {
          // Duplicate key
          attempt++;
          continue;
        }

        accountError = error;
        break;
      }

      if (accountError || !accountData) {
        Alert.alert('Account Error', accountError?.message || 'Could not create account. Please try again.');
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('user')
        .insert({
          user_auth_id: userAuthId,
          account_id: accountData.account_id,
          user_access_type: 'user',
          user_type: userType,
          user_nickname: nickname,
          user_dob: dob,
          avatar_id: null,
        })
        .select()
        .single();

      if (userError) return Alert.alert('User Error', userError.message);

      await supabase.from('account').update({ account_owner: userData.user_id }).eq('account_id', accountData.account_id);
      navigation.replace('Profile');

    } else {
      const { data: accountRecord, error: fetchError } = await supabase
        .from('account')
        .select()
        .eq('account_invitation', invitationCode)
        .gt('account_invitation_expiry', new Date().toISOString())
        .single();

      if (fetchError || !accountRecord) {
        setErrors({ invitationCode: 'Invitation code is invalid. Please contact the account owner.' });
        return;
      }

      const { error: userError } = await supabase.from('user').insert({
        user_auth_id: userAuthId,
        account_id: accountRecord.account_id,
        user_access_type: 'user',
        user_type: userType,
        user_nickname: nickname,
        user_dob: dob,
        avatar_id: null,
      });

      if (userError) return Alert.alert('User Error', userError.message);
      navigation.replace('Profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Setup account</Text>

      <Text style={styles.label}>Your nickname</Text>
      <TextInput
        style={[styles.input, errors.nickname && styles.errorInput]}
        placeholder="Enter your nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <Text style={styles.errorText}>{errors.nickname}</Text>

      <Text style={styles.label}>Choose your avatar</Text>
      <View style={styles.input}><Text>[Avatar selection goes here]</Text></View>

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
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>User type</Text>
      <Picker selectedValue={userType} onValueChange={setUserType} style={styles.input}>
        <Picker.Item label="Parent" value="parent" />
        <Picker.Item label="Kid" value="kid" />
      </Picker>

      <Text style={styles.label}>Are you creating a new account?</Text>
      <Picker
        selectedValue={isCreatingAccount ? 'yes' : 'no'}
        onValueChange={(val) => setIsCreatingAccount(val === 'yes')}
        style={styles.input}
      >
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </Picker>

      {isCreatingAccount ? (
        <>
          <Text style={styles.label}>Your account name</Text>
          <TextInput
            style={[styles.input, errors.accountName && styles.errorInput]}
            placeholder="Enter your account name"
            value={accountName}
            onChangeText={setAccountName}
          />
          <Text style={styles.errorText}>{errors.accountName}</Text>
        </>
      ) : (
        <>
          <Text style={styles.label}>Invitation code</Text>
          <TextInput
            style={[styles.input, errors.invitationCode && styles.errorInput]}
            placeholder="Enter invitation code"
            value={invitationCode}
            onChangeText={setInvitationCode}
          />
          <Text style={styles.errorText}>{errors.invitationCode}</Text>
        </>
      )}

      <Button title="Setup Account" onPress={validateAndSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});
