export enum QUESTION_IPC_METHODS {
  GET_ONE = 'get_question',
  GET_BY_TEST_ID = 'get_questions',
  UPDATE_QUESTION = 'put_question',
  CREATE = 'post_question',
  DELETE = 'delete_question',
}

export enum TEST_IPC_METHODS {
  GET_ONE = 'get_test',
  GET_ALL = 'get_tests',
  UPDATE = 'put_test',
  CREATE = 'post_test',
  DELETE = 'delete_test',
}

export enum ANSWER_IPC_METHODS {
  GET_ONE = 'get_answer',
  GET_ALL = 'get_answers',
  CREATE = 'post_answer',
}

export enum APP_IPC_METHODS {
  ENCRYPT_DB = 'encrypt_db',
  ADD_PDF = 'post_pdf',
  DELETE_PDF = 'delete_pdf',
}

export enum THEORY_METHODS {
  GET_ALL = 'get_all_theory',
  CREATE = 'post_theory',
  UPDATE = 'put_theory',
  GET_PDF = 'get_pdf_theory',
  DELETE = 'delete_theory',
}

export enum EXERCISE_METHODS {
  GET_ALL = 'get_exercises',
  CREATE = 'post_exercise',
  UPDATE = 'put_exercise',
  GET_PDF = 'get_pdf_exercise',
  DELETE = 'delete_exercise',
}

export type ALL_IPC_METHODS =
  | QUESTION_IPC_METHODS
  | TEST_IPC_METHODS
  | ANSWER_IPC_METHODS
  | APP_IPC_METHODS
  | THEORY_METHODS
  | EXERCISE_METHODS
