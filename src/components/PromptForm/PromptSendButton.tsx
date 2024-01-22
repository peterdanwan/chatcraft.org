import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from "@chakra-ui/react";
import { TbChevronUp, TbSend } from "react-icons/tb";

import useMobileBreakpoint from "../../hooks/use-mobile-breakpoint";
import { useSettings } from "../../hooks/use-settings";
import { useModels } from "../../hooks/use-models";
import theme from "../../theme";
import { AiFillSound, AiOutlineSound } from "react-icons/ai";

type PromptSendButtonProps = {
  isLoading: boolean;
};

function MobilePromptSendButton({ isLoading }: PromptSendButtonProps) {
  const { settings, setSettings } = useSettings();
  const { models } = useModels();

  return (
    <ButtonGroup variant="outline" isAttached>
      <Menu placement="top" strategy="fixed" offset={[-90, 0]}>
        <IconButton
          type="submit"
          size="lg"
          variant="solid"
          isRound
          aria-label="Submit"
          isLoading={isLoading}
          icon={<TbSend />}
        />
        <MenuButton
          as={IconButton}
          size="lg"
          isRound
          variant="solid"
          aria-label="Choose Model"
          title="Choose Model"
          icon={<TbChevronUp />}
        />
        <MenuList maxHeight={"70vh"} overflowY={"auto"} zIndex={theme.zIndices.dropdown}>
          {models.map((model) => (
            <MenuItem key={model.id} onClick={() => setSettings({ ...settings, model })}>
              {model.prettyModel}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </ButtonGroup>
  );
}

function DesktopPromptSendButton({ isLoading }: PromptSendButtonProps) {
  const { settings, setSettings } = useSettings();
  const { models } = useModels();

  return (
    <ButtonGroup isAttached>
      <Button type="submit" size="sm" isLoading={isLoading} loadingText="Sending">
        Ask {settings.model.prettyModel}
      </Button>
      <Tooltip label={settings.announceMessages ? "TTS Enabled" : "TTS Disabled"}>
        <Button
          type="button"
          size="sm"
          onClick={() => setSettings({ ...settings, announceMessages: !settings.announceMessages })}
        >
          {settings.announceMessages ? <AiFillSound /> : <AiOutlineSound />}
        </Button>
      </Tooltip>
      <Menu placement="top" strategy="fixed">
        <MenuButton
          as={IconButton}
          size="sm"
          aria-label="Choose Model"
          title="Choose Model"
          icon={<TbChevronUp />}
        />
        <MenuList maxHeight={"70vh"} overflowY={"auto"} zIndex={theme.zIndices.dropdown}>
          {models.map((model) => (
            <MenuItem key={model.id} onClick={() => setSettings({ ...settings, model })}>
              {model.prettyModel}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </ButtonGroup>
  );
}

export default function PromptSendButton(props: PromptSendButtonProps) {
  const isMobile = useMobileBreakpoint();

  return isMobile ? <MobilePromptSendButton {...props} /> : <DesktopPromptSendButton {...props} />;
}
