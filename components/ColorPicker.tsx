/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

const colorSelectorStyle =
  "cursor-pointer border-2 px-2 py-1 my-2 mx-auto w-full block rounded-xl focus:outline-none  transition-colors hover:border-[deeppink]";

export interface Color {
  enable: boolean;
  value: string;
}

export interface ColorPickerProps {
  color: Color;
  setColor(val: Color): void;
  backgroundColor: Color;
  setBackgroundColor(val: Color): void;
}

export function ColorPicker(props: ColorPickerProps) {
  const useDefultColor = () =>
    props.setColor({ enable: false, value: props.color.value });
  const updateColor = (value: string) =>
    props.setColor({ enable: true, value });
  const useDefultBackgroundColor = () =>
    props.setBackgroundColor({
      enable: false,
      value: props.backgroundColor.value,
    });
  const updateBackgroundColor = (value: string) =>
    props.setBackgroundColor({ enable: true, value });
  return (
    <div>
      <table class={tw`mx-auto text-center`}>
        <tr class={tw`border-b-1 border-gray-400`}>
          <td class={tw`text-right px-2`}>
            text color :{" "}
          </td>
          <td>
            <ColorCheckBox
              text="default (black)"
              color={props.color}
              onClick={useDefultColor}
            />
          </td>
          <td class={tw`px-2`}>or</td>
          <td>
            <ColorSelector
              color={props.color}
              onChange={updateColor}
            />
          </td>
        </tr>
        <tr>
          <td class={tw`text-right px-2`}>
            background color :{" "}
          </td>
          <td>
            <ColorCheckBox
              text="default (transparent)"
              color={props.backgroundColor}
              onClick={useDefultBackgroundColor}
            />
          </td>
          <td class={tw`px-2`}>or</td>
          <td>
            <ColorSelector
              color={props.backgroundColor}
              onChange={updateBackgroundColor}
            />
          </td>
        </tr>
      </table>
    </div>
  );
}

function ColorCheckBox(props: { text: string; color: Color; onClick(): void }) {
  return (
    <button
      class={tw(colorSelectorStyle)}
      style={props.color.enable ? {} : { borderColor: "deeppink" }}
      onClick={() => props.onClick()}
    >
      {props.text}
    </button>
  );
}

function ColorSelector(props: { color: Color; onChange(v: string): void }) {
  return (
    <label
      class={tw(colorSelectorStyle)}
      style={props.color.enable ? { borderColor: "deeppink" } : {}}
    >
      <input
        type="color"
        value={props.color.value}
        onChange={({ currentTarget: { value } }) => props.onChange(value)}
        onClick={({ currentTarget: { value } }) => props.onChange(value)}
        class={tw`w-6 h-6 cursor-pointer`}
      />{"  "}
      {props.color.value}
    </label>
  );
}
