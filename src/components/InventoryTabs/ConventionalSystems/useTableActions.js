import React, { useCallback } from 'react';
import {
  GENERAL_GROUPS_WRITE_PERMISSION,
  NO_MODIFY_GROUPS_TOOLTIP_MESSAGE,
  NO_MODIFY_GROUP_TOOLTIP_MESSAGE,
  NO_MODIFY_HOST_TOOLTIP_MESSAGE,
  REQUIRED_PERMISSIONS_TO_MODIFY_GROUP,
  REQUIRED_PERMISSION_TO_MODIFY_HOST_IN_GROUP,
} from '../../../constants';
import { ActionDropdownItem } from '../../InventoryTable/ActionWithRBAC';
import useFeatureFlag from '../../../Utilities/useFeatureFlag';

// some actions are hidden under feature flag
const useTableActions = (
  setCurrentSystem,
  onEditOpen,
  handleModalToggle,
  setRemoveHostsFromGroupModalOpen,
  setAddHostGroupModalOpen
) => {
  const groupsEnabled = useFeatureFlag('hbi.ui.inventory-groups');

  const tableActionsCallback = useCallback(
    (row) => {
      const hostActions = [
        {
          title: (
            <ActionDropdownItem
              key={`${row.id}-edit`}
              onClick={() => {
                setCurrentSystem(row);
                onEditOpen(() => true);
              }}
              requiredPermissions={[
                REQUIRED_PERMISSION_TO_MODIFY_HOST_IN_GROUP(
                  row.groups?.[0]?.id ?? null
                ),
              ]}
              noAccessTooltip={NO_MODIFY_HOST_TOOLTIP_MESSAGE}
            >
              Edit
            </ActionDropdownItem>
          ),
          style: {
            padding: 0, // custom component creates extra padding space
          },
        },
        {
          title: (
            <ActionDropdownItem
              key={`${row.id}-delete`}
              onClick={() => {
                setCurrentSystem(row);
                handleModalToggle(() => true);
              }}
              requiredPermissions={[
                REQUIRED_PERMISSION_TO_MODIFY_HOST_IN_GROUP(
                  row.groups?.[0]?.id ?? null
                ),
              ]}
              noAccessTooltip={NO_MODIFY_HOST_TOOLTIP_MESSAGE}
            >
              Delete
            </ActionDropdownItem>
          ),
          style: {
            padding: 0,
          },
        },
      ];

      const groupActions = [
        {
          title: (
            <ActionDropdownItem
              key={`${row.id}-add-to-group`}
              onClick={() => {
                setCurrentSystem([row]);
                setAddHostGroupModalOpen(true);
              }}
              requiredPermissions={[GENERAL_GROUPS_WRITE_PERMISSION]}
              noAccessTooltip={NO_MODIFY_GROUPS_TOOLTIP_MESSAGE}
              isAriaDisabled={row.groups.length > 0} // additional condition for enabling the button
              ignoreResourceDefinitions // to check if there is any groups:write permission (disregarding RD)
            >
              Add to group
            </ActionDropdownItem>
          ),
          style: {
            padding: 0,
          },
        },
        {
          title: (
            <ActionDropdownItem
              key={`${row.id}-remove-from-group`}
              onClick={() => {
                setCurrentSystem([row]);
                setRemoveHostsFromGroupModalOpen(true);
              }}
              requiredPermissions={
                row?.groups?.[0]?.id !== undefined
                  ? REQUIRED_PERMISSIONS_TO_MODIFY_GROUP(row.groups[0].id)
                  : []
              }
              noAccessTooltip={NO_MODIFY_GROUP_TOOLTIP_MESSAGE}
              isAriaDisabled={row.groups.length === 0}
              override={row?.groups?.[0]?.id === undefined ? true : undefined} // has access if no group
            >
              Remove from group
            </ActionDropdownItem>
          ),
          style: {
            padding: 0,
          },
        },
      ];

      return [...(groupsEnabled ? groupActions : []), ...hostActions];
    },

    [groupsEnabled]
  );

  return tableActionsCallback;
};

export default useTableActions;
