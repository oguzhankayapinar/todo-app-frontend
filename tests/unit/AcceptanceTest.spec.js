import { shallowMount } from '@vue/test-utils';
import TodoComponent from './../../src/components/TodoComponent.vue';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, title: 'Yeni Görev', completed: false }]),
  })
);

describe('Todo Uygulaması Kabul Testi', () => {
  test('Yeni bir todo eklenebilir ve listede görüntülenebilir', async () => {
    const wrapper = shallowMount(TodoComponent);

    const input = wrapper.find('.todo-input');
    const button = wrapper.find('.btn.add');

    await input.setValue('Yeni Görev');
    await button.trigger('click');

    const todoItems = wrapper.findAll('.todo-item');
    expect(todoItems.length).toBeGreaterThan(0);
    expect(todoItems.at(0).text()).toContain('Yeni Görev');
  });
});
