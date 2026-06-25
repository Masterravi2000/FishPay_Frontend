import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import TextScallingFalse from "../CentralText/TextScalingFalse";
import CardIcon from "../svgIcons/CreditCards/CardIcon";
import CalendarIcon from "../svgIcons/CreditCards/CalendarIcon";
import InfoIcon from "../svgIcons/CreditCards/InfoIcon";

const AddCardSection = () => {
  return (
    <View style={styles.addCardView}>
      <View style={styles.addCardContainer}>
        <TextScallingFalse style={styles.addCardHeaderText}>
          Add Card
        </TextScallingFalse>
        <View style={styles.cardFormSection}>
          <View style={styles.cardHolderNameSection}>
            <TextScallingFalse style={styles.cardHolderNameText}>
              Cardholder Number
            </TextScallingFalse>
            <View style={styles.cardHolderNameInputView}>
              <TextInput placeholder="Card Number" placeholderTextColor={'#c9c9c9'} style={styles.cardHolderNameInputSection} />
              <View style={styles.cardIconView}>
                <CardIcon />
              </View>
            </View>
          </View>
          <View style={styles.addCardBottomSection}>
            <View style={styles.addCardExpirySection}>
              <TextScallingFalse style={styles.addCardExpiryHeaderText}>
                Expiry Date
              </TextScallingFalse>
              <View style={styles.expiryInputSection}>
                <TextInput placeholder="MM/YY" placeholderTextColor={'#c9c9c9'} style={styles.expiryInputComponent} />
                <View style={styles.calendarIconView}>
                  <CalendarIcon />
                </View>
              </View>
            </View>
            <View style={styles.securitySection}>
              <TextScallingFalse style={styles.securityHeaderText}>
                Security Code
              </TextScallingFalse>
              <View style={styles.securityInputSection}>
                <TextInput  placeholder="CVV" placeholderTextColor={'#c9c9c9'} style={styles.securityInputComponent} />
                <View style={styles.infoIconView}>
                  <InfoIcon />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddCardSection;

const styles = StyleSheet.create({
  addCardView: {
    width: "100%",
  },
  addCardContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 10,
  },
  addCardHeaderText: {
    color: "#303030",
    fontSize: 14,
    fontWeight: 400,
    padding: 10,
  },
  cardFormSection: {
    width: "100%",
    gap: 5,
  },
  cardHolderNameSection: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    gap: 5,
  },
  cardHolderNameText: {
    color: "#909090",
    fontSize: 11,
    fontWeight: "400",
    paddingLeft: 5,
  },
  cardHolderNameInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#adadad",
  },
  cardHolderNameInputSection: {
    paddingStart: 15,
    width: "80%",
    color: "gray",
    fontSize: 10,
    fontWeight: "500",
  },
  cardIconView: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
  },
  addCardBottomSection: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addCardExpirySection: {
    width: "48%",
    gap: 4,
  },
  addCardExpiryHeaderText: {
    color: "#909090",
    fontSize: 11,
    fontWeight: "400",
    paddingLeft: 5,
  },
  expiryInputSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#adadad",
  },
  expiryInputComponent: {
    paddingStart: 15,
    width: "80%",
    color: "gray",
    fontSize: 10,
    fontWeight: "500",
  },
  calendarIconView: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
  },
  securitySection: {
    width: "48%",
    gap: 4,
  },
  securityHeaderText: {
    color: "#909090",
    fontSize: 11,
    fontWeight: "400",
    paddingLeft: 5,
  },
  securityInputSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#adadad",
  },
  securityInputComponent: {
    paddingStart: 15,
    width: "80%",
    color: "gray",
    fontSize: 10,
    fontWeight: "500",
  },
  infoIconView: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
  },
});
