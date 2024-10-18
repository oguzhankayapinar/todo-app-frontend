import { shallowMount } from '@vue/test-utils';
import TodoComponent from '@/components/TodoComponent.vue';

describe('TodoComponent', () => {
  test('Başlık doğru şekilde render ediliyor mu', () => {
    const wrapper = shallowMount(TodoComponent);
    const header = wrapper.find('h1');
    expect(header.text()).toBe('Todo List');
  });
});
