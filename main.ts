radio.onReceivedNumber(function (receivedNumber) {
    a = receivedNumber
})
function 動かす (X: number, Y: number, R: number) {
    M1速度 = Y + X - R
    M2速度 = Y - X + R
    M3速度 = Y - X - R
    M4速度 = Y + X + R
    MAX(M1速度, M2速度, M3速度, M4速度)
    S1角度 = Math.map(M1速度, 0 - 最大値, 最大値, 0, 180)
    S2角度 = 180 - Math.map(M2速度, 0 - 最大値, 最大値, 0, 180)
    S3角度 = Math.map(M3速度, 0 - 最大値, 最大値, 0, 180)
    S4角度 = 180 - Math.map(M4速度, 0 - 最大値, 最大値, 0, 180)
    pins.servoWritePin(AnalogPin.P0, S1角度)
    pins.servoWritePin(AnalogPin.P1, S2角度)
    pins.servoWritePin(AnalogPin.P2, S3角度)
    softservo.softServo(DigitalPin.P8, S4角度)
}
radio.onReceivedString(function (receivedString) {
    saveString = receivedString
})
function MAX (数値1: number, 数値2: number, 数値3: number, 数値4: number) {
    最大値 = Math.max(Math.abs(数値1), Math.abs(数値2))
    最大値 = Math.max(最大値, Math.abs(数値3))
    最大値 = Math.max(最大値, Math.abs(数値4))
    最大値 = Math.max(最大値, 512)
}
let r = 0
let y = 0
let x = 0
let S4角度 = 0
let S3角度 = 0
let S2角度 = 0
let 最大値 = 0
let S1角度 = 0
let M4速度 = 0
let M3速度 = 0
let M2速度 = 0
let M1速度 = 0
let a = 0
let saveString = ""
let radioGroup = 0
let 無線グループ設定中 = true
getradiogroup.initRadioGroup()
basic.showIcon(IconNames.SmallHeart)
while (radioGroup == 0) {
    radioGroup = getradiogroup.getRadioGroup(saveString)
    if (radioGroup == 0) {
        basic.showIcon(IconNames.Sad)
    } else {
        watchfont.showNumber2(radioGroup)
    }
}
saveString = ""
無線グループ設定中 = false
radio.setTransmitPower(7)
basic.forever(function () {
    if (saveString != "" && !(無線グループ設定中)) {
        x = parseFloat(split.split(saveString)[1])
        y = parseFloat(split.split(saveString)[2])
        if (a == 1) {
            r = 512
        } else if (a == 4) {
            r = -512
        } else if (a == 2) {
            r = 255
        } else if (a == 3) {
            r = -255
        } else {
            r = 0
        }
        動かす(x, y, r)
    }
})
