import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={{ marginBottom: 16, ...otherStyles }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{title}</Text>

      <View style={{ borderWidth: 2, borderColor: '#d1d1d1', width: '100%', height: 64, paddingHorizontal: 16, backgroundColor: '#f5f5f5', borderRadius: 16, justifyContent: 'center' }}>
        <TextInput 
          style={{ flex: 1, color: '#000', fontSize: 16, fontWeight: '500' }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

        {title === 'Password' && ( 
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)} 
            style={{ position: 'absolute', right: 16, bottom: 16 }}
          >
            <Image 
              source={showPassword ? icons.eye : icons.eyeHide} 
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField