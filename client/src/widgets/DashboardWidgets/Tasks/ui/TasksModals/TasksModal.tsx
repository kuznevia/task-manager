import React from 'react';
import { Task } from 'widgets/DashboardWidgets/Tasks/model/tasksTypes';
import { DeleteDataModal } from 'widgets/DashboardWidgets/Tasks/ui/TasksModals/DeleteDataModal';
import { EditDataModal } from 'widgets/DashboardWidgets/Tasks/ui/TasksModals/EditDataModal';
import { TaskDetailsModal } from 'widgets/DashboardWidgets/Tasks/ui/TasksModals/TaskDetailsModal';

type Props = {
  disclousureProps: {
    isEditFormOpen: boolean;
    onEditFormOpen: () => void;
    onEditFormClose: () => void;
    isDeleteFormOpen: boolean;
    onDeleteFormOpen: () => void;
    onDeleteFormClose: () => void;
    isDetailsModalOpen: boolean;
    onDetailsModalOpen: () => void;
    onDetailsModalClose: () => void;
  };
  tasksProps: {
    deletingId: string;
    editingTask?: Task;
    dataFetch: () => Promise<void>;
    setEditingTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
    setDeletingId: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const TasksModal = ({ disclousureProps, tasksProps }: Props) => {
  const {
    isEditFormOpen,
    onEditFormOpen,
    onEditFormClose,
    isDeleteFormOpen,
    onDeleteFormOpen,
    onDeleteFormClose,
    isDetailsModalOpen,
    onDetailsModalClose,
  } = disclousureProps;
  const { deletingId, editingTask, dataFetch, setDeletingId, setEditingTask } =
    tasksProps;
  return (
    <>
      <EditDataModal
        isOpen={isEditFormOpen}
        onClose={onEditFormClose}
        dataFetch={dataFetch}
        task={editingTask}
      />
      <DeleteDataModal
        isOpen={isDeleteFormOpen}
        onClose={onDeleteFormClose}
        dataFetch={dataFetch}
        deletingId={deletingId}
      />
      <TaskDetailsModal
        task={editingTask}
        isOpen={isDetailsModalOpen}
        onEdit={() => {
          setEditingTask(editingTask);
          onEditFormOpen();
          onDetailsModalClose();
        }}
        onDelete={() => {
          setDeletingId(editingTask ? editingTask._id : '');
          onDeleteFormOpen();
          onDetailsModalClose();
        }}
        onClose={onDetailsModalClose}
      />
    </>
  );
};
