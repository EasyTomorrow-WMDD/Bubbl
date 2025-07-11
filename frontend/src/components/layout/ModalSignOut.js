import React from 'react';
import { Modal, View, Text, Pressable, Image } from 'react-native';
import BubblColors from '../../styles/BubblColors';
import { fontStyles } from '../../styles/BubblFontStyles';

const SignOutModal = ({ visible, onCancel, onConfirm }) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    width: '85%',
                    backgroundColor: '#FFF8E7',
                    borderRadius: 24,
                    padding: 24,
                    alignItems: 'center',
                    position: 'relative',
                }}>

                    {/* Close Button */}
                    <Pressable onPress={onCancel} style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: '#FCD34D',
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 5,
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: '#7A310D',
                            fontWeight: 'bold',
                        }}>✕</Text>
                    </Pressable>

                    {/* Icon */}
                    <Image
                        source={require('../../assets/icons/log-out.png')}
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: '#F59E0B',
                            marginBottom: 16,
                        }}
                    />

                    {/* Title */}
                    <Text style={{
                        fontSize: 18,
                        color: '#461802',
                        marginBottom: 8,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                        You are about to sign out.
                    </Text>

                    {/* Subtitle */}
                    <Text style={{
                        fontSize: 14,
                        color: '#7B3F00',
                        textAlign: 'center',
                        marginBottom: 24,
                    }}>
                        You'll need your login credentials to access your profile and data.
                    </Text>

                    {/* Buttons */}
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <Pressable onPress={onCancel} style={{
                            paddingVertical: 20,
                            paddingHorizontal: 26,
                            borderWidth: 2,
                            borderColor: '#E2B007',
                            borderRadius: 12,
                        }}>
                            <Text style={{
                                color: '#A16207',
                                fontWeight: '600',
                            }}>Cancel</Text>
                        </Pressable>

                        <Pressable onPress={onConfirm} style={{
                            paddingVertical: 20,
                            paddingHorizontal: 26,
                            backgroundColor: '#FCD34D',
                            borderRadius: 12,
                        }}>
                            <Text style={{
                                color: '#7B3F00',
                                fontWeight: '600',
                            }}>Sign Out</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default SignOutModal;
