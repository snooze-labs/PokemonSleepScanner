import * as React from 'react';
import {
  IngredientID,
  getIngredientData,
} from '../../gameData/ingredients/ingredients';
import {
  Avatar,
  IconButton,
  Surface,
  TextInput,
  TextInputProps,
  Tooltip,
} from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

interface IIngredientCounterProps {
  ingredientID: IngredientID;
  count: number;
  updateCount: (count: number) => void;
}

/**
 * Represents an ingredient counter with controls to subtract, add and modify the count.
 */
export class IngredientCountControl extends React.PureComponent<IIngredientCounterProps> {
  render() {
    const { ingredientID, count, updateCount } = this.props;
    const ingredient = getIngredientData(ingredientID);
    return (
      <Surface style={styles.surface}>
        <View style={styles.rowContainer}>
          <IconButton
            icon="remove"
            style={styles.iconButton}
            disabled={count === 0}
            onPress={() => {
              updateCount(count - 1);
            }}
          />
          <Tooltip title={ingredient.name}>
            <Avatar.Image
              style={styles.ingredientImageAvatar}
              size={24}
              source={ingredient.imageSrc}
            />
          </Tooltip>
          <TextInput
            value={String(count)}
            underlineColor="transparent"
            style={styles.numberInput}
            render={(renderProps: TextInputProps) => (
              <TextInputMask
                {...renderProps}
                selectTextOnFocus={true}
                keyboardType={'numeric'}
                onChangeText={formatted => {
                  const num = Number(formatted);
                  updateCount(isNaN(num) ? 0 : num);
                }}
              />
            )}
          />
          <IconButton
            icon="add"
            style={styles.iconButton}
            onPress={() => {
              updateCount(count + 1);
            }}
          />
        </View>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    borderRadius: 20,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ingredientImageAvatar: {
    marginLeft: -5,
  },
  numberInput: {
    alignSelf: 'center',
    width: 50,
    backgroundColor: 'transparent',
    marginLeft: -5,
  },
  iconButton: {
    margin: 0,
  },
});
