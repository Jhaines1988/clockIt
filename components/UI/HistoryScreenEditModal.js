import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import GradientView from './BackgroundContainer';

const HistoryScreenEditModal = ({ modalVisible }) => {
  return (
    <Modal visible={modalVisible} presentationStyle="fullScreen" animationType="slide">
      <GradientView></GradientView>
    </Modal>
  );
};

export default HistoryScreenEditModal;

const styles = StyleSheet.create({});
