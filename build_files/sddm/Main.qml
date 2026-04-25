import QtQuick 2.2
import SddmComponents 2.0

Rectangle {
    id: root
    width: 1024
    height: 768
    property string background: "#2d2d30"
    property string accent: "#00bcd4"
    property string text: "#d2d2d2"
    property string dimText: "#888888"

    Rectangle {
        id: backgroundRect
        anchors.fill: parent
        color: background
    }

    Rectangle {
        id: logoArea
        width: parent.width
        height: 150
        anchors.top: parent.top
        color: "transparent"

        Text {
            anchors.centerIn: parent
            text: "S3RLINUX ATOMIC"
            font.pixelSize: 36
            font.family: "Noto Sans"
            font.bold: true
            color: accent
        }
    }

    Rectangle {
        id: clockArea
        anchors.top: parent.top
        anchors.right: parent.right
        anchors.margins: 30
        width: 120
        height: 70
        color: "transparent"

        Text {
            id: clockTime
            anchors.centerIn: parent
            font.pixelSize: 32
            color: accent

            Timer {
                interval: 1000
                repeat: true
                running: true
                onTriggered: clockTime.text = new Date().toLocaleString("hh:mm")
            }
        }

        Text {
            id: clockDate
            anchors.top: clockTime.bottom
            anchors.horizontalCenter: parent.horizontalCenter
            font.pixelSize: 12
            color: dimText
            Timer {
                interval: 60000
                repeat: true
                running: true
                onTriggered: clockDate.text = new Date().toLocaleString("yyyy-MM-dd")
            }
        }
    }

    Column {
        id: inputColumn
        anchors.centerIn: parent
        spacing: 8

        Text {
            text: "Username"
            color: text
            font.pixelSize: 12
        }

        TextBox {
            id: username
            width: 250
            text: userList.currentUser
            fontColor: text
            borderColor: accent

            KeyNavigation.tab: password
        }

        Text {
            text: "Password"
            color: text
            font.pixelSize: 12
            margin.top: 8
        }

        PasswordBox {
            id: password
            width: 250
            fontColor: text
            borderColor: accent

            KeyNavigation.tab: loginButton

            onAccepted: main.login()
        }

        Button {
            id: loginButton
            width: 250
            text: "Login"
            color: accent

            margin.top: 16

            onClicked: main.login()
        }
    }

    Rectangle {
        id: sddmText
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 15
        anchors.horizontalCenter: parent.horizontalCenter

        Text {
            text: "RAVE ALL NIGHT"
            font.pixelSize: 14
            color: accent
        }
    }
}