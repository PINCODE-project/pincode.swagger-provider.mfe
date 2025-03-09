/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Swagger Provider Documentation
 * Сервис для объединения Swagger схем в одном месте
 * OpenAPI spec version: 1.0
 */
import {axiosInstance as axios} from './axios';
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  AddMemberToWorkspaceDto,
  AppControllerGetHealth200,
  AuthControllerCallbackParams,
  AuthControllerLogin200,
  ConnectToProviderResponseDto,
  CreateMicroserviceDto,
  CreateProjectDto,
  CreateSnippetDto,
  CreateWorkspaceDto,
  LoginDto,
  RegisterDto,
  UpdateSnippetDto,
  UpdateUserDto
} from '../../model'



  /**
 * @summary Регистрация пользователя
 */
export const authControllerRegister = <TData = AxiosResponse<void>>(
    registerDto: RegisterDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/auth/register`,
      registerDto,options
    );
  }

/**
 * @summary Авторизация пользователя
 */
export const authControllerLogin = <TData = AxiosResponse<AuthControllerLogin200>>(
    loginDto: LoginDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/auth/login`,
      loginDto,options
    );
  }

/**
 * Используется провайдерами

Перенаправляет на фронт по адресу вместе с токеном /auth/callback?accessToken=ТОКЕН
 * @summary Авторизация через Oauth
 */
export const authControllerCallback = <TData = AxiosResponse<void>>(
    provider: 'yandex' | 'github',
    params: AuthControllerCallbackParams, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/auth/oauth/callback/${provider}`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }

/**
 * @summary Получение ссылки на Oauth авторизацию
 */
export const authControllerConnect = <TData = AxiosResponse<ConnectToProviderResponseDto>>(
    provider: 'yandex' | 'github', options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/auth/oauth/connect/${provider}`,options
    );
  }

/**
 * @summary Получение профиля пользователя
 */
export const userControllerFindProfile = <TData = AxiosResponse<unknown>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/user/profile`,options
    );
  }

/**
 * @summary Обновление профиля пользователя
 */
export const userControllerUpdateProfile = <TData = AxiosResponse<unknown>>(
    updateUserDto: UpdateUserDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.patch(
      `/api/user/profile`,
      updateUserDto,options
    );
  }

/**
 * @summary Получение пользователя по ID
 */
export const userControllerFindById = <TData = AxiosResponse<unknown>>(
    id: string, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/user/by-id/${id}`,options
    );
  }

/**
 * @summary Создание рабочего пространства
 */
export const workspaceControllerCreate = <TData = AxiosResponse<unknown>>(
    createWorkspaceDto: CreateWorkspaceDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/workspace`,
      createWorkspaceDto,options
    );
  }

/**
 * @summary Получение пространств пользователя
 */
export const workspaceControllerFindAll = <TData = AxiosResponse<unknown>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/workspace`,options
    );
  }

/**
 * @summary Добавить пользователя в пространство
 */
export const workspaceControllerAddMemberToWorkspace = <TData = AxiosResponse<unknown>>(
    addMemberToWorkspaceDto: AddMemberToWorkspaceDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/workspace/add-member`,
      addMemberToWorkspaceDto,options
    );
  }

/**
 * @summary Получение пространства
 */
export const workspaceControllerFindOne = <TData = AxiosResponse<unknown>>(
    id: string, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/workspace/${id}`,options
    );
  }

/**
 * @summary Создание проекта
 */
export const projectControllerCreate = <TData = AxiosResponse<unknown>>(
    createProjectDto: CreateProjectDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/project`,
      createProjectDto,options
    );
  }

/**
 * @summary Получение всех проектов в пространстве
 */
export const projectControllerFindAllBuWorkspace = <TData = AxiosResponse<unknown>>(
    workspaceId: string, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/project/by-workspace/${workspaceId}`,options
    );
  }

/**
 * @summary Создание микросервиса (схемы)
 */
export const microserviceControllerCreate = <TData = AxiosResponse<unknown>>(
    createMicroserviceDto: CreateMicroserviceDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/microservice`,
      createMicroserviceDto,options
    );
  }

/**
 * @summary Получение схемы
 */
export const microserviceControllerFindOne = <TData = AxiosResponse<unknown>>(
    id: string, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/microservice/${id}`,options
    );
  }

/**
 * @summary Создание сниппета
 */
export const snippetControllerCreate = <TData = AxiosResponse<unknown>>(
    createSnippetDto: CreateSnippetDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/api/snippet`,
      createSnippetDto,options
    );
  }

/**
 * @summary Получение всех сниппетов пользователя
 */
export const snippetControllerFindAll = <TData = AxiosResponse<unknown>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/snippet`,options
    );
  }

/**
 * @summary Обновление сниппета
 */
export const snippetControllerUpdate = <TData = AxiosResponse<unknown>>(
    id: string,
    updateSnippetDto: UpdateSnippetDto, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.patch(
      `/api/snippet/${id}`,
      updateSnippetDto,options
    );
  }

/**
 * @summary Удаление сниппета
 */
export const snippetControllerRemove = <TData = AxiosResponse<void>>(
    id: string, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.delete(
      `/api/snippet/${id}`,options
    );
  }

/**
 * @summary Проверка работоспособности БД
 */
export const appControllerGetHealth = <TData = AxiosResponse<AppControllerGetHealth200>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/api/health`,options
    );
  }

export type AuthControllerRegisterResult = AxiosResponse<void>
export type AuthControllerLoginResult = AxiosResponse<AuthControllerLogin200>
export type AuthControllerCallbackResult = AxiosResponse<void>
export type AuthControllerConnectResult = AxiosResponse<ConnectToProviderResponseDto>
export type UserControllerFindProfileResult = AxiosResponse<unknown>
export type UserControllerUpdateProfileResult = AxiosResponse<unknown>
export type UserControllerFindByIdResult = AxiosResponse<unknown>
export type WorkspaceControllerCreateResult = AxiosResponse<unknown>
export type WorkspaceControllerFindAllResult = AxiosResponse<unknown>
export type WorkspaceControllerAddMemberToWorkspaceResult = AxiosResponse<unknown>
export type WorkspaceControllerFindOneResult = AxiosResponse<unknown>
export type ProjectControllerCreateResult = AxiosResponse<unknown>
export type ProjectControllerFindAllBuWorkspaceResult = AxiosResponse<unknown>
export type MicroserviceControllerCreateResult = AxiosResponse<unknown>
export type MicroserviceControllerFindOneResult = AxiosResponse<unknown>
export type SnippetControllerCreateResult = AxiosResponse<unknown>
export type SnippetControllerFindAllResult = AxiosResponse<unknown>
export type SnippetControllerUpdateResult = AxiosResponse<unknown>
export type SnippetControllerRemoveResult = AxiosResponse<void>
export type AppControllerGetHealthResult = AxiosResponse<AppControllerGetHealth200>
